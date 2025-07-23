export interface JobPostModel {
    id: number,
    name: string,
    description: string,
    location: string,
    type: string,
    salary: number,
    createdAt: Date,
    companyName: string,
    recruiterName: string
}