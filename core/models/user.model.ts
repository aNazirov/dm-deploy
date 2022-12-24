import {eTable, eTablePermission} from "./table.model";

export enum eRoleType {
	Director = 1,
	Manager,
	User,
}

export interface IContact {
	phone: string;
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
	table: eTable;
	permissions: eTablePermission[];

	constructor(permission: PermissionModel) {
		this.table = permission.table;
		this.permissions = permission.permissions;
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
