import {eTable, eTablePermission} from "./table.model";

export enum eRoleType {
	Director = 1,
	Manager,
	User,
}

export enum eScope {
	Level_1 = "Level_1",
	Level_2 = "Level_2",
	Level_3 = "Level_3",
	Level_4 = "Level_4",
}

export interface IContact {
	phone: string;
}

export interface IUserShortInfo {
	displayName: ITranslate;
	id: number;
}

export interface ITranslate {
	ru: string;
	uz: string;
	en: string;
}

export interface ILogin {
	phone: string;
	password: string;
}

export class UserModel {
	id: number;
	displayName: ITranslate;
	organization: {id: number; title: ITranslate};
	permissions?: PermissionModel[];
	contact: IContact;
	birthDate?: Date;
	// role: RoleModel;
	speciality: ISpeciality;
	position: IPosition;
	firstName?: string;
	lastName?: string;
	secondName?: string;

	constructor(user: UserModel) {
		this.id = user.id;
		this.displayName = user.displayName;
		this.organization = user.organization;
		this.contact = user.contact;
		this.speciality = user.speciality;
		this.position = user.position;

		// this.role = new RoleModel(user.role);

		if (user.permissions) {
			this.permissions = user.permissions.map((p) => new PermissionModel(p));
		}

		if (user.birthDate) {
			this.birthDate = new Date(user.birthDate);
		}

		if (user.firstName) this.firstName = user.firstName;
		if (user.lastName) this.lastName = user.lastName;
		if (user.secondName) this.secondName = user.secondName;
	}
}

export class RoleModel {
	id: number;
	title: ITranslate;
	permissions: PermissionModel[];

	constructor(role: RoleModel) {
		this.id = role.id;
		this.title = role.title;
		this.permissions = role.permissions.map((p) => new PermissionModel(p));
	}
}

export class PermissionModel {
	id?: number;
	table: eTable;
	permissions: eTablePermission[];
	scope: eScope;

	constructor(permission: PermissionModel) {
		this.table = permission.table;
		this.permissions = permission.permissions;
		this.scope = permission.scope;

		if (permission.id) {
			this.id = permission.id;
		}
	}
}

export interface ISpeciality {
	id: number;
	title: ITranslate;
}

export interface IPosition {
	id: number;
	title: ITranslate;
}

export interface IUserCreateParams {
	firstName: string;
	lastName: string;
	secondName: string;
	phone: string;
	organizationId?: number;
	specialityId: number;
	positionId: number;
	birthDate: string;
	password: string;
	permissions: PermissionModel[];
}

export interface IUserFilterParams {
	skip: number;
	take: number;
	search?: string;
}
