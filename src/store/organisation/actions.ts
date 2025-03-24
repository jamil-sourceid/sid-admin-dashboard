import {
  FETCH_ORGANISATIONS_REQUEST,
  FETCH_ORGANISATIONS_SUCCESS,
  FETCH_ORGANISATIONS_FAILURE,
  FetchOrganisationsRequestAction,
  FetchOrganisationsSuccessAction,
  FetchOrganisationsFailureAction,
  OrganizationsResponse,
} from './types';

export const fetchOrganisationsRequest = (
  params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }
): FetchOrganisationsRequestAction => ({
  type: FETCH_ORGANISATIONS_REQUEST,
  payload: params,
});

export const fetchOrganisationsSuccess = (
  data: OrganizationsResponse
): FetchOrganisationsSuccessAction => ({
  type: FETCH_ORGANISATIONS_SUCCESS,
  payload: data,
});

export const fetchOrganisationsFailure = (
  error: string
): FetchOrganisationsFailureAction => ({
  type: FETCH_ORGANISATIONS_FAILURE,
  payload: { error },
}); 