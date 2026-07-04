import * as cmsContactRepository from "./cmsContact.repository";
import AppError from "../../../shared/utils/AppError";
export const createCmsContactService = async (data) => {
    return cmsContactRepository.createCmsContact(data);
};
export const getAllCmsContactsService = async () => {
    return cmsContactRepository.findAllCmsContacts();
};
export const getCmsContactByIdService = async (id) => {
    const contact = await cmsContactRepository.findCmsContactById(id);
    if (!contact) {
        throw new AppError("Contact not found", 404);
    }
    return contact;
};
export const getCmsContactByTypeService = async (type) => {
    const contact = await cmsContactRepository.findCmsContactByType(type);
    if (!contact) {
        throw new AppError("Contact not found", 404);
    }
    return contact;
};
export const updateCmsContactService = async (id, data) => {
    const contact = await cmsContactRepository.findCmsContactById(id);
    if (!contact) {
        throw new AppError("Contact not found", 404);
    }
    return cmsContactRepository.updateCmsContact(id, data);
};
export const deleteCmsContactService = async (id) => {
    const contact = await cmsContactRepository.findCmsContactById(id);
    if (!contact) {
        throw new AppError("Contact not found", 404);
    }
    return cmsContactRepository.softDeleteCmsContact(id);
};
