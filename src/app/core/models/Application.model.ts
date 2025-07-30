import { UserModel } from "./User.model";

export interface ApplicationModel {
    id: number,
    applicant: UserModel,
    jobName: string,
    status: string,
    appliedAt: Date
}