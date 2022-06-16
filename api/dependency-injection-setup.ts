import { createContainer, InjectionMode, asValue, asClass } from "awilix";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

import sequelize from "./src/db/models/index";

import logger from "./src/libs/logger";

//  File
//
import FileController from "./src/controllers/FileController";
import FileService from "./src/services/FileService";
import FileRepository from "./src/db/repositories/FileRepository";
import FileMapper from "./src/mappers/file-mapper";

// Download
//
import DownloadService from "./src/services/DownloadService";
import DownloadRepository from "./src/db/repositories/DownloadRepository";

// Request
//
import RequestController from "./src/controllers/RequestController";
import RequestService from "./src/services/RequestService";
import RequestRepository from "./src/db/repositories/RequestRepository";
// import SubscriptionMapper from "./src/mappers/subscription-mapper";

const container = createContainer({
  injectionMode: InjectionMode.PROXY, // InjectionMode.PROXY means awilix will inject the container itself which let's us to desctructure from it what we need
});

function registerDependencies() {
  container.register({
    // UUID
    //
    uuid: asValue(uuid),

    // Bcrypt
    //
    bcrypt: asValue(bcrypt),

    // DB
    //
    db: asValue(sequelize),

    // Logger
    //
    logger: asValue(logger),

    // File
    //
    fileController: asClass(FileController),
    fileService: asClass(FileService),
    fileRepository: asClass(FileRepository),
    fileMapper: asValue(FileMapper),

    // Download
    //
    downloadService: asClass(DownloadService),
    downloadRepository: asClass(DownloadRepository),

    // Request
    //
    requestController: asClass(RequestController),
    requestService: asClass(RequestService),
    requestRepository: asClass(RequestRepository),
  });
}

export { container, registerDependencies };
