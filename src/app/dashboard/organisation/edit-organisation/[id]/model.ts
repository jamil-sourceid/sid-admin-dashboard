import { Organization } from "@/store/organisation/types";

export interface ExtendedOrganization extends Omit<Organization, "keyContact"> {
  email?: string;
  phoneNumber?: string;
  keyContact?: {
    _id?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
  };
}

export interface FormValues {
  name: string;
  email: string;
  phoneNumber: string;
  country: string;
  distanceTolerance: number;
  address: {
    addressLineOne: string;
    addressLineTwo?: string;
    city: string;
    region: string;
    zipCode: string;
    countryCode: string;
  };
}

// Staff interface based on the provided schema
export interface StaffMember {
  _id: string;
  title: string;
  firstName: string;
  lastName: string;
  middleName: string;
  photo: string;
  phoneNumber: string;
  email: string;
  emailVerified: boolean;
  mfaTotpSecret: string | null;
  isMfaSetupComplete: boolean;
  verified: boolean;
  dateOfBirth: string;
  roles: string[];
}
