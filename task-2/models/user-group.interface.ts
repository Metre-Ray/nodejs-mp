type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export type UserGroupType = {
    id: string;
    name: string;
    permissions: string[];
}

export interface IUsersToGroupMap {
    groupId: string;
    userId: string;
}
