
import { ApiKey, ApiKeyValidationRequest, ApiKeyValidationResponse, InstitutionCreationRequest, InstitutionCreationResponse } from '@/types';
import { MOCK_API_KEYS } from '@/constants';

export const validateAdminApiKey = async (request: ApiKeyValidationRequest): Promise<ApiKeyValidationResponse> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 800));

  const apiKey = MOCK_API_KEYS.find(ak => ak.key === request.apiKey);

  if (!apiKey) {
    return {
      isValid: false,
      message: 'Invalid API key. Key not found in our records.',
      details: {
        apiKeyStatus: 'not_found',
        adminMatch: false,
        institutionMatch: false,
        lmsMatch: false,
        hasPermissions: false,
        permissions: []
      }
    };
  }

  const adminMatch = apiKey.adminId === request.adminIdentifier || apiKey.adminEmail === request.adminIdentifier;
  const institutionMatch = apiKey.institutionId === request.institutionIdentifier || apiKey.institutionName === request.institutionIdentifier;
  const lmsMatch = !request.lmsSystemId || apiKey.lmsSystemId === request.lmsSystemId;
  const isExpired = apiKey.status === 'expired' || new Date(apiKey.expiryDate) < new Date();
  const isRevoked = apiKey.status === 'revoked';
  
  const isValid = !isExpired && !isRevoked && adminMatch && institutionMatch && lmsMatch;

  let message = 'API key validated successfully.';
  if (!isValid) {
    if (isExpired) message = 'API key has expired.';
    else if (isRevoked) message = 'API key has been revoked.';
    else if (!adminMatch) message = 'API key is not issued for this administrator.';
    else if (!institutionMatch) message = 'API key is not issued for this institution.';
    else if (!lmsMatch) message = 'API key is not issued for this LMS system.';
  }

  return {
    isValid,
    message,
    details: {
      apiKeyStatus: isExpired ? 'expired' : (isRevoked ? 'revoked' : 'active'),
      adminMatch,
      institutionMatch,
      lmsMatch,
      hasPermissions: apiKey.permissions.length > 0,
      permissions: apiKey.permissions
    }
  };
};

export const createInstitutionWithApiKey = async (request: InstitutionCreationRequest): Promise<InstitutionCreationResponse> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 1500));

  const institutionId = `inst_${Math.random().toString(36).substr(2, 9)}`;
  const apiKey = `enara_live_${Math.random().toString(36).substr(2, 24)}`;
  const username = request.adminEmail.split('@')[0] + '_' + Math.floor(Math.random() * 1000);
  const password = Math.random().toString(36).substr(2, 12);

  return {
    success: true,
    message: 'Institution created and API key generated successfully.',
    credentials: {
      username,
      password
    },
    apiKey,
    institutionId
  };
};
