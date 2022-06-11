import { createContainer, InjectionMode, asValue, asClass } from "awilix";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

import sequelize from "./src/db/models/index";

import logger from "./src/libs/logger";

// Stripe
//
import StripeService from "./src/services/StripeService";

// Email
//
import EmailService from "./src/services/EmailService";

// Auth
//
import OAuthService from "./src/services/OAuthService";

// Image
//
import ImageService from "./src/services/ImageService";

// PDF
//
import PdfService from "./src/services/PdfService";

// Recommendation
//
import RecommendationService from "./src/services/RecommendationService";

//  User
//
import UserController from "./src/controllers/UserController";
import UserService from "./src/services/UserService";
import UserRepository from "./src/db/repositories/UserRepository";
import UserMapper from "./src/mappers/user-mapper";

// Book
//
import BookController from "./src/controllers/BookController";
import BookService from "./src/services/BookService";
import BookRepository from "./src/db/repositories/BookRepository";
import BookMapper from "./src/mappers/book-mapper";

// Subscription
//
import SubscriptionController from "./src/controllers/SubscriptionController";
import SubscriptionService from "./src/services/SubscriptionService";
import SubscriptionRepository from "./src/db/repositories/SubscriptionRepository";
import SubscriptionMapper from "./src/mappers/subscription-mapper";

// SubscriptionCancellation
//
import SubscriptionCancellationMapper from "./src/mappers/subscription-cancellation-mapper";

// Invoice
//
import InvoiceRepository from "./src/db/repositories/InvoiceRepository";
import InvoiceService from "./src/services/InvoiceService";
import InvoiceMapper from "./src/mappers/invoice-mapper";

// Download
//
import DownloadService from "./src/services/DownloadService";
import DownloadRepository from "./src/db/repositories/DownloadRepository";

// UserBookActivity
//
import UserBookActivityRepository from "./src/db/repositories/UserBookActivityRepository";

// Goal
//
import GoalMapper from "./src/mappers/goal-mapper";

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

    // Stripe
    //
    stripeService: asClass(StripeService),

    // Email
    //
    emailService: asClass(EmailService),

    // Invoice
    //
    invoiceService: asClass(InvoiceService),
    invoiceRepository: asClass(InvoiceRepository),
    invoiceMapper: asValue(InvoiceMapper),

    // Auth
    //
    oauthService: asClass(OAuthService),

    // Image
    //
    imageService: asClass(ImageService),

    // PDF
    //
    pdfService: asClass(PdfService),

    // Recommendatio
    //
    recommendationService: asClass(RecommendationService),

    // User
    //
    userController: asClass(UserController),
    userService: asClass(UserService),
    userRepository: asClass(UserRepository),
    userMapper: asValue(UserMapper),

    // Book
    //
    bookController: asClass(BookController),
    bookService: asClass(BookService),
    bookRepository: asClass(BookRepository),
    bookMapper: asValue(BookMapper),

    // Subscription
    //
    subscriptionController: asClass(SubscriptionController),
    subscriptionService: asClass(SubscriptionService),
    subscriptionRepository: asClass(SubscriptionRepository),
    subscriptionMapper: asValue(SubscriptionMapper),

    // Subscription Cancellation
    //
    subscriptionCancellationMapper: asValue(SubscriptionCancellationMapper),

    // Download
    //
    downloadService: asClass(DownloadService),
    downloadRepository: asClass(DownloadRepository),

    // UserBookActivity
    //
    userBookActivityRepository: asClass(UserBookActivityRepository),

    // Goal
    //
    goalMapper: asValue(GoalMapper),
  });
}

export { container, registerDependencies };
