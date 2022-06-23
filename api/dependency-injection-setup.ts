import { createContainer, InjectionMode, asValue, asClass } from "awilix";
import { v4 as uuid } from "uuid";
import crypto from "crypto";

import sequelize from "./src/db/models/index";

import logger from "./src/libs/logger";

//  File
//
import FileController from "./src/controllers/FileController";
import FileService from "./src/services/FileService";
import FileRepository from "./src/db/repositories/FileRepository";
import FileMapper from "./src/mappers/file-mapper";

// Request
//
import RequestController from "./src/controllers/RequestController";
import RequestService from "./src/services/RequestService";
import RequestRepository from "./src/db/repositories/RequestRepository";
import RequestMapper from "./src/mappers/request-mapper";

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
    crypto: asValue(crypto),

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

    // Request
    //
    requestController: asClass(RequestController),
    requestService: asClass(RequestService),
    requestRepository: asClass(RequestRepository),
    requestMapper: asValue(RequestMapper),
  });
}

export { container, registerDependencies };
