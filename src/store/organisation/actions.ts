import {
  FETCH_ORGANISATIONS_REQUEST,
  FETCH_ORGANISATIONS_SUCCESS,
  FETCH_ORGANISATIONS_FAILURE,
  CREATE_ORGANISATION_REQUEST,
  CREATE_ORGANISATION_SUCCESS,
  CREATE_ORGANISATION_FAILURE,
  RESET_CREATE_ORGANISATION_STATE,
  UPDATE_ORGANISATION_REQUEST,
  UPDATE_ORGANISATION_SUCCESS,
  UPDATE_ORGANISATION_FAILURE,
  RESET_UPDATE_ORGANISATION_STATE,
  TOGGLE_ORGANISATION_MFA_REQUEST,
  TOGGLE_ORGANISATION_MFA_SUCCESS,
  TOGGLE_ORGANISATION_MFA_FAILURE,
  FetchOrganisationsRequestAction,
  FetchOrganisationsSuccessAction,
  FetchOrganisationsFailureAction,
  CreateOrganisationRequestAction,
  CreateOrganisationSuccessAction,
  CreateOrganisationFailureAction,
  ResetCreateOrganisationStateAction,
  UpdateOrganisationRequestAction,
  UpdateOrganisationSuccessAction,
  UpdateOrganisationFailureAction,
  ResetUpdateOrganisationStateAction,
  ToggleOrganisationMfaRequestAction,
  ToggleOrganisationMfaSuccessAction,
  ToggleOrganisationMfaFailureAction,
  OrganizationsResponse,
  CreateOrganizationResponse,
  UpdateOrganizationResponse,
  ToggleOrganizationMfaResponse,
  CreateOrganizationPayload,
  UpdateOrganizationPayload,
  ToggleOrganizationMfaPayload,
} from './types';

export const fetchOrganisationsRequest = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  mfaIsEnabled?: boolean;
}): FetchOrganisationsRequestAction => ({
  type: FETCH_ORGANISATIONS_REQUEST,
  payload: params,
});

export const fetchOrganisationsSuccess = (
  data: OrganizationsResponse
): FetchOrganisationsSuccessAction => ({
  type: FETCH_ORGANISATIONS_SUCCESS,
  payload: data,
});

export const fetchOrganisationsFailure = (error: string): FetchOrganisationsFailureAction => ({
  type: FETCH_ORGANISATIONS_FAILURE,
  payload: { error },
});

export const createOrganisationRequest = (
  payload: CreateOrganizationPayload
): CreateOrganisationRequestAction => ({
  type: CREATE_ORGANISATION_REQUEST,
  payload,
});

export const createOrganisationSuccess = (
  data: CreateOrganizationResponse
): CreateOrganisationSuccessAction => ({
  type: CREATE_ORGANISATION_SUCCESS,
  payload: data,
});

export const createOrganisationFailure = (error: string): CreateOrganisationFailureAction => ({
  type: CREATE_ORGANISATION_FAILURE,
  payload: { error },
});

export const resetCreateOrganisationState = (): ResetCreateOrganisationStateAction => ({
  type: RESET_CREATE_ORGANISATION_STATE,
});

export const updateOrganisationRequest = (
  payload: UpdateOrganizationPayload
): UpdateOrganisationRequestAction => ({
  type: UPDATE_ORGANISATION_REQUEST,
  payload,
});

export const updateOrganisationSuccess = (
  data: UpdateOrganizationResponse
): UpdateOrganisationSuccessAction => ({
  type: UPDATE_ORGANISATION_SUCCESS,
  payload: data,
});

export const updateOrganisationFailure = (error: string): UpdateOrganisationFailureAction => ({
  type: UPDATE_ORGANISATION_FAILURE,
  payload: { error },
});

export const resetUpdateOrganisationState = (): ResetUpdateOrganisationStateAction => ({
  type: RESET_UPDATE_ORGANISATION_STATE,
});

export const toggleOrganisationMfaRequest = (
  payload: ToggleOrganizationMfaPayload
): ToggleOrganisationMfaRequestAction => ({
  type: TOGGLE_ORGANISATION_MFA_REQUEST,
  payload,
});

export const toggleOrganisationMfaSuccess = (
  data: ToggleOrganizationMfaResponse
): ToggleOrganisationMfaSuccessAction => ({
  type: TOGGLE_ORGANISATION_MFA_SUCCESS,
  payload: data,
});

export const toggleOrganisationMfaFailure = (
  error: string
): ToggleOrganisationMfaFailureAction => ({
  type: TOGGLE_ORGANISATION_MFA_FAILURE,
  payload: { error },
});
