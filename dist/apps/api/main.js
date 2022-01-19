/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const config_1 = __webpack_require__("@nestjs/config");
const throttler_1 = __webpack_require__("@nestjs/throttler");
const serve_static_1 = __webpack_require__("@nestjs/serve-static");
const path_1 = __webpack_require__("path");
const auth_module_1 = __webpack_require__("./apps/api/src/app/repositories/auth/auth.module.ts");
const users_module_1 = __webpack_require__("./apps/api/src/app/repositories/users/users.module.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/api/src/app/repositories/auth/guards/jwt-auth.guard.ts");
const configuration_1 = __webpack_require__("./apps/api/src/app/configs/configuration.ts");
const routes_1 = __webpack_require__("./apps/api/src/app/routes.ts");
const shared_module_1 = __webpack_require__("./apps/api/src/app/shared/shared.module.ts");
let AppModule = class AppModule {
};
AppModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
                    return ({
                        uri: configService.get(configuration_1.configuration.YMRLK_MONGODB_CONNECTION_STRING),
                        dbName: configService.get(configuration_1.configuration.YMRLK_MONGODB_DATABASE_NAME),
                        retryAttempts: configService.get(configuration_1.configuration.YMRLK_MONGODB_RETRY_ATTEMPTS),
                        retryDelay: configService.get(configuration_1.configuration.YMRLK_MONGODB_RETRY_DELAY),
                        user: configService.get(configuration_1.configuration.YMRLK_MONGODB_USER),
                        pass: configService.get(configuration_1.configuration.YMRLK_MONGODB_PASSWORD),
                    });
                }),
                inject: [config_1.ConfigService],
            }),
            config_1.ConfigModule.forRoot({
                cache: true,
                isGlobal: true,
                envFilePath: '.env.development.local',
            }),
            throttler_1.ThrottlerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
                    return ({
                        ttl: configService.get(configuration_1.configuration.YMRLK_THROTTLE_TTL),
                        limit: configService.get(configuration_1.configuration.YMRLK_THROTTLE_LIMIT),
                    });
                }),
                inject: [config_1.ConfigService],
            }),
            core_1.RouterModule.register(routes_1.routes),
            // Custom
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            shared_module_1.SharedModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'client'),
                exclude: ['/api*']
            })
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/api/src/app/configs/configuration.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.configuration = void 0;
exports.configuration = {
    YMRLK_MONGODB_CONNECTION_STRING: 'YMRLK_MONGODB_CONNECTION_STRING',
    YMRLK_MONGODB_DATABASE_NAME: 'YMRLK_MONGODB_DATABASE_NAME',
    YMRLK_MONGODB_RETRY_ATTEMPTS: 'YMRLK_MONGODB_RETRY_ATTEMPTS',
    YMRLK_MONGODB_RETRY_DELAY: 'YMRLK_MONGODB_RETRY_DELAY',
    YMRLK_MONGODB_USER: 'YMRLK_MONGODB_USER',
    YMRLK_MONGODB_PASSWORD: 'YMRLK_MONGODB_PASSWORD',
    YMRLK_THROTTLE_TTL: 'YMRLK_THROTTLE_TTL',
    YMRLK_THROTTLE_LIMIT: 'YMRLK_THROTTLE_LIMIT',
    YMRLK_JWT_SECRET: 'YMRLK_JWT_SECRET',
    YMRLK_JWT_EXPIRES_IN: 'YMRLK_JWT_EXPIRES_IN',
    YMRLK_REFRESH_TOKEN_EXPIRATION_DAYS: 'YMRLK_REFRESH_TOKEN_EXPIRATION_DAYS',
    YMRLK_REFRESH_TOKEN_SIZE: 'YMRLK_REFRESH_TOKEN_SIZE'
};


/***/ }),

/***/ "./apps/api/src/app/decorators/roles.decorator.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__("@nestjs/common");
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),

/***/ "./apps/api/src/app/decorators/skip-jwt-check.decorator.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SkipJwtCheck = exports.SKIP_JWT_CHECK = void 0;
const common_1 = __webpack_require__("@nestjs/common");
exports.SKIP_JWT_CHECK = 'skipJwtCheck';
const SkipJwtCheck = () => (0, common_1.SetMetadata)(exports.SKIP_JWT_CHECK, true);
exports.SkipJwtCheck = SkipJwtCheck;


/***/ }),

/***/ "./apps/api/src/app/repositories/auth/auth.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const config_1 = __webpack_require__("@nestjs/config");
const users_module_1 = __webpack_require__("./apps/api/src/app/repositories/users/users.module.ts");
const auth_service_1 = __webpack_require__("./apps/api/src/app/repositories/auth/services/auth.service.ts");
const jwt_strategy_1 = __webpack_require__("./apps/api/src/app/repositories/auth/strategies/jwt.strategy.ts");
const local_strategy_1 = __webpack_require__("./apps/api/src/app/repositories/auth/strategies/local.strategy.ts");
const jwt_refresh_token_strategy_1 = __webpack_require__("./apps/api/src/app/repositories/auth/strategies/jwt-refresh-token.strategy.ts");
const auth_controller_1 = __webpack_require__("./apps/api/src/app/repositories/auth/controllers/auth.controller.ts");
const configuration_1 = __webpack_require__("./apps/api/src/app/configs/configuration.ts");
let AuthModule = class AuthModule {
};
AuthModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController],
        imports: [
            users_module_1.UsersModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
                    return ({
                        secret: configService.get(configuration_1.configuration.YMRLK_JWT_SECRET),
                        signOptions: {
                            expiresIn: configService.get(configuration_1.configuration.YMRLK_JWT_EXPIRES_IN)
                        }
                    });
                }),
                inject: [config_1.ConfigService]
            })
        ],
        providers: [
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            jwt_refresh_token_strategy_1.JwtRefreshTokenStrategy
        ],
        exports: [auth_service_1.AuthService]
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./apps/api/src/app/repositories/auth/controllers/auth.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const local_auth_guard_1 = __webpack_require__("./apps/api/src/app/repositories/auth/guards/local-auth.guard.ts");
const auth_service_1 = __webpack_require__("./apps/api/src/app/repositories/auth/services/auth.service.ts");
const auth_token_request_payload_interface_1 = __webpack_require__("./apps/api/src/app/repositories/auth/interfaces/auth-token-request-payload.interface.ts");
const jwt_refresh_auth_guard_1 = __webpack_require__("./apps/api/src/app/repositories/auth/guards/jwt-refresh-auth.guard.ts");
const skip_jwt_check_decorator_1 = __webpack_require__("./apps/api/src/app/decorators/skip-jwt-check.decorator.ts");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(request) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { userName, uuid } = request.user._doc;
            return this.authService.login({ user: { userName, sub: uuid } });
        });
    }
    refreshToken(req) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.authService.login(req);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.HttpCode)(200),
    (0, skip_jwt_check_decorator_1.SkipJwtCheck)(),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    (0, tslib_1.__param)(0, (0, common_1.Request)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AuthController.prototype, "login", null);
(0, tslib_1.__decorate)([
    (0, common_1.HttpCode)(200),
    (0, skip_jwt_check_decorator_1.SkipJwtCheck)(),
    (0, common_1.UseGuards)(jwt_refresh_auth_guard_1.JwtRefreshAuthGuard),
    (0, common_1.Post)('refresh'),
    (0, tslib_1.__param)(0, (0, common_1.Request)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof auth_token_request_payload_interface_1.AuthTokenRequestPayloadInterface !== "undefined" && auth_token_request_payload_interface_1.AuthTokenRequestPayloadInterface) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
AuthController = (0, tslib_1.__decorate)([
    (0, common_1.Controller)(),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_b = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _b : Object])
], AuthController);
exports.AuthController = AuthController;


/***/ }),

/***/ "./apps/api/src/app/repositories/auth/guards/jwt-auth.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
const core_1 = __webpack_require__("@nestjs/core");
const skip_jwt_check_decorator_1 = __webpack_require__("./apps/api/src/app/decorators/skip-jwt-check.decorator.ts");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    canActivate(context) {
        const skipAuth = this.reflector.getAllAndOverride(skip_jwt_check_decorator_1.SKIP_JWT_CHECK, [
            context.getHandler(),
            context.getClass()
        ]);
        if (skipAuth) {
            return true;
        }
        return super.canActivate(context);
    }
};
JwtAuthGuard = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),

/***/ "./apps/api/src/app/repositories/auth/guards/jwt-refresh-auth.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtRefreshAuthGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
let JwtRefreshAuthGuard = class JwtRefreshAuthGuard extends (0, passport_1.AuthGuard)('jwt-refresh') {
};
JwtRefreshAuthGuard = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], JwtRefreshAuthGuard);
exports.JwtRefreshAuthGuard = JwtRefreshAuthGuard;


/***/ }),

/***/ "./apps/api/src/app/repositories/auth/guards/local-auth.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalAuthGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
let LocalAuthGuard = class LocalAuthGuard extends (0, passport_1.AuthGuard)('local') {
};
LocalAuthGuard = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], LocalAuthGuard);
exports.LocalAuthGuard = LocalAuthGuard;


/***/ }),

/***/ "./apps/api/src/app/repositories/auth/interfaces/auth-token-request-payload.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/api/src/app/repositories/auth/services/auth.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const bcrypt_1 = __webpack_require__("bcrypt");
const rand_token_1 = __webpack_require__("rand-token");
const users_service_1 = __webpack_require__("./apps/api/src/app/repositories/users/services/users.service.ts");
const configuration_1 = __webpack_require__("./apps/api/src/app/configs/configuration.ts");
let AuthService = class AuthService {
    constructor(usersService, jwtService, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    validateUser(email, password) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const userDocument = yield this.usersService.findOne(email);
            if (!userDocument) {
                return null;
            }
            const arePasswordsSame = yield (0, bcrypt_1.compare)(password, userDocument.password);
            if (userDocument && arePasswordsSame) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password } = userDocument, result = (0, tslib_1.__rest)(userDocument, ["password"]);
                return result;
            }
        });
    }
    login(loginPayload) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { userName, sub } = loginPayload.user;
            const payload = { userName, sub };
            return {
                accessToken: this.jwtService.sign(payload),
                refreshToken: yield this.generateRefreshToken(sub)
            };
        });
    }
    generateRefreshToken(userUUID) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const refreshToken = (0, rand_token_1.generate)(this.configService.get(configuration_1.configuration.YMRLK_REFRESH_TOKEN_SIZE));
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + +this.configService.get(configuration_1.configuration.YMRLK_REFRESH_TOKEN_EXPIRATION_DAYS));
            yield this.usersService.saveOrUpdateRefreshToken(userUUID, refreshToken, expirationDate);
            return refreshToken;
        });
    }
};
AuthService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ "./apps/api/src/app/repositories/auth/strategies/jwt-refresh-token.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtRefreshTokenStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const passport_1 = __webpack_require__("@nestjs/passport");
const passport_jwt_1 = __webpack_require__("passport-jwt");
const users_service_1 = __webpack_require__("./apps/api/src/app/repositories/users/services/users.service.ts");
const configuration_1 = __webpack_require__("./apps/api/src/app/configs/configuration.ts");
let JwtRefreshTokenStrategy = class JwtRefreshTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh') {
    constructor(configService, usersService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromBodyField('accessToken'),
            ignoreExpiration: true,
            secretOrKey: configService.get(configuration_1.configuration.YMRLK_JWT_SECRET),
            passReqToCallback: true
        });
        this.configService = configService;
        this.usersService = usersService;
    }
    validate(request, payload) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const userDocument = yield this.usersService.findByUUID(payload.sub);
            if (!userDocument) {
                throw new common_1.UnauthorizedException('No refresh token found');
            }
            if (request.body.refreshToken != (yield userDocument).refreshToken) {
                throw new common_1.UnauthorizedException('Refresh token does not matched');
            }
            if (new Date() > new Date((yield userDocument).refreshTokenExpiresIn)) {
                throw new common_1.UnauthorizedException('Refresh token expired');
            }
            return { sub: payload.sub, userName: userDocument.userName };
        });
    }
};
JwtRefreshTokenStrategy = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _b : Object])
], JwtRefreshTokenStrategy);
exports.JwtRefreshTokenStrategy = JwtRefreshTokenStrategy;


/***/ }),

/***/ "./apps/api/src/app/repositories/auth/strategies/jwt.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
const passport_jwt_1 = __webpack_require__("passport-jwt");
const config_1 = __webpack_require__("@nestjs/config");
const configuration_1 = __webpack_require__("./apps/api/src/app/configs/configuration.ts");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor(configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get(configuration_1.configuration.YMRLK_JWT_SECRET)
        });
        this.configService = configService;
    }
    validate(payload) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return { sub: payload.sub, userName: payload.userName };
        });
    }
};
JwtStrategy = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),

/***/ "./apps/api/src/app/repositories/auth/strategies/local.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const passport_1 = __webpack_require__("@nestjs/passport");
const passport_local_1 = __webpack_require__("passport-local");
const auth_service_1 = __webpack_require__("./apps/api/src/app/repositories/auth/services/auth.service.ts");
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(moduleRef) {
        super({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        });
        this.moduleRef = moduleRef;
    }
    validate(request, email, password) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const contextId = core_1.ContextIdFactory.getByRequest(request);
            const authService = yield this.moduleRef.resolve(auth_service_1.AuthService, contextId);
            const userDocument = yield authService.validateUser(email, password);
            if (!userDocument) {
                throw new common_1.HttpException('User was not found', common_1.HttpStatus.NOT_FOUND);
            }
            return userDocument;
        });
    }
};
LocalStrategy = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof core_1.ModuleRef !== "undefined" && core_1.ModuleRef) === "function" ? _a : Object])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;


/***/ }),

/***/ "./apps/api/src/app/repositories/users/controllers/users/users.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const data_1 = __webpack_require__("./libs/data/src/index.ts");
const skip_jwt_check_decorator_1 = __webpack_require__("./apps/api/src/app/decorators/skip-jwt-check.decorator.ts");
const users_service_1 = __webpack_require__("./apps/api/src/app/repositories/users/services/users.service.ts");
const roles_decorator_1 = __webpack_require__("./apps/api/src/app/decorators/roles.decorator.ts");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    getByEmail(email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const userDocument = yield this.usersService.findByEmail(email.email);
            if (!userDocument) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    error: `User with ${email.email} email was not found`
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return userDocument;
        });
    }
    getByUUID(uuid) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const userDocument = yield this.usersService.findByUUID(uuid.uuid);
            if (!userDocument) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    error: `User with ${uuid.uuid} was not found`
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return userDocument;
        });
    }
    createOne(model) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const userDocument = yield this.usersService.createOne(model);
            if (userDocument) {
                return userDocument;
            }
            else {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.BAD_REQUEST,
                    error: 'User already exist'
                }, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    addRole(uuid) {
        return uuid;
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Get)('email/:email'),
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], UsersController.prototype, "getByEmail", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)('uuid/:uuid'),
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UsersController.prototype, "getByUUID", null);
(0, tslib_1.__decorate)([
    (0, common_1.HttpCode)(200),
    (0, skip_jwt_check_decorator_1.SkipJwtCheck)(),
    (0, common_1.Post)('register'),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_c = typeof data_1.UserInterface !== "undefined" && data_1.UserInterface) === "function" ? _c : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UsersController.prototype, "createOne", null);
(0, tslib_1.__decorate)([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('remove-user'),
    (0, roles_decorator_1.Roles)(data_1.RoleEnum.Admin),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Object)
], UsersController.prototype, "addRole", null);
UsersController = (0, tslib_1.__decorate)([
    (0, common_1.Controller)(),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_e = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _e : Object])
], UsersController);
exports.UsersController = UsersController;


/***/ }),

/***/ "./apps/api/src/app/repositories/users/schemas/user.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
let User = class User {
};
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)({ type: String, maxlength: 50 }),
    (0, tslib_1.__metadata)("design:type", String)
], User.prototype, "userName", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)({ type: String, maxlength: 50 }),
    (0, tslib_1.__metadata)("design:type", String)
], User.prototype, "firstName", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)({ type: String, maxlength: 50 }),
    (0, tslib_1.__metadata)("design:type", String)
], User.prototype, "lastName", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)({ type: String, maxlength: 250 }),
    (0, tslib_1.__metadata)("design:type", String)
], User.prototype, "shortBio", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        name: { type: String },
        path: { type: String }
    })),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], User.prototype, "avatar", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        url: { type: String },
        prefix: { type: String }
    })),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Record !== "undefined" && Record) === "function" ? _b : Object)
], User.prototype, "accountUrl", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    (0, tslib_1.__metadata)("design:type", String)
], User.prototype, "email", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    (0, tslib_1.__metadata)("design:type", String)
], User.prototype, "password", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        country: { type: String },
        city: { type: String }
    })),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof Record !== "undefined" && Record) === "function" ? _c : Object)
], User.prototype, "from", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)({ type: [String], required: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], User.prototype, "roles", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    (0, tslib_1.__metadata)("design:type", String)
], User.prototype, "uuid", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)({ type: String }),
    (0, tslib_1.__metadata)("design:type", String)
], User.prototype, "refreshToken", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)({ type: Date }),
    (0, tslib_1.__metadata)("design:type", String)
], User.prototype, "refreshTokenExpiresIn", void 0);
User = (0, tslib_1.__decorate)([
    (0, mongoose_1.Schema)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);


/***/ }),

/***/ "./apps/api/src/app/repositories/users/services/users.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const bcrypt_1 = __webpack_require__("bcrypt");
const uuid_1 = __webpack_require__("uuid");
const user_schema_1 = __webpack_require__("./apps/api/src/app/repositories/users/schemas/user.schema.ts");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    findOne(email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const foundUserDocument = yield this.userModel.findOne({ email }).exec();
            if (!foundUserDocument) {
                return null;
            }
            return foundUserDocument;
        });
    }
    findByEmail(email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const foundUserDocument = yield this.userModel.findOne({ email }).select('-password').exec();
            if (!foundUserDocument) {
                return null;
            }
            return foundUserDocument;
        });
    }
    findByUUID(uuid) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const foundUserDocument = yield this.userModel.findOne({ uuid }).select('-password').exec();
            if (!foundUserDocument) {
                return null;
            }
            return foundUserDocument;
        });
    }
    createOne(model) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const userExist = yield this.findByEmail(model.email);
            if (!userExist) {
                return this.getCreatedDocument(model);
            }
            return false;
        });
    }
    saveOrUpdateRefreshToken(uuid, refreshToken, refreshTokenExpiresIn) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            yield this.userModel.findOneAndUpdate({ uuid }, {
                refreshToken,
                refreshTokenExpiresIn
            });
        });
    }
    getCreatedDocument(model) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const modelCopy = Object.assign(Object.assign({}, model), { password: yield this.hashPassword(model.password), uuid: (0, uuid_1.v1)() });
            const user = yield new this.userModel(modelCopy).save();
            if (user) {
                return true;
            }
        });
    }
    hashPassword(password) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield (0, bcrypt_1.hash)(password, 10);
        });
    }
};
UsersService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], UsersService);
exports.UsersService = UsersService;


/***/ }),

/***/ "./apps/api/src/app/repositories/users/users.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const users_service_1 = __webpack_require__("./apps/api/src/app/repositories/users/services/users.service.ts");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const shared_module_1 = __webpack_require__("./apps/api/src/app/shared/shared.module.ts");
const user_schema_1 = __webpack_require__("./apps/api/src/app/repositories/users/schemas/user.schema.ts");
const users_controller_1 = __webpack_require__("./apps/api/src/app/repositories/users/controllers/users/users.controller.ts");
let UsersModule = class UsersModule {
};
UsersModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        controllers: [users_controller_1.UsersController],
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            shared_module_1.SharedModule
        ],
        providers: [users_service_1.UsersService],
        exports: [users_service_1.UsersService]
    })
], UsersModule);
exports.UsersModule = UsersModule;


/***/ }),

/***/ "./apps/api/src/app/routes.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.routes = void 0;
const auth_module_1 = __webpack_require__("./apps/api/src/app/repositories/auth/auth.module.ts");
const users_module_1 = __webpack_require__("./apps/api/src/app/repositories/users/users.module.ts");
exports.routes = [
    {
        path: 'auth',
        module: auth_module_1.AuthModule
    },
    {
        path: 'users',
        module: users_module_1.UsersModule
    }
];


/***/ }),

/***/ "./apps/api/src/app/shared/guards/roles.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const roles_decorator_1 = __webpack_require__("./apps/api/src/app/decorators/roles.decorator.ts");
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => { var _a; return (_a = user.roles) === null || _a === void 0 ? void 0 : _a.includes(role); });
    }
};
RolesGuard = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);
exports.RolesGuard = RolesGuard;


/***/ }),

/***/ "./apps/api/src/app/shared/shared.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const roles_guard_1 = __webpack_require__("./apps/api/src/app/shared/guards/roles.guard.ts");
let SharedModule = class SharedModule {
};
SharedModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard
            }
        ]
    })
], SharedModule);
exports.SharedModule = SharedModule;


/***/ }),

/***/ "./libs/data/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
// User exports
(0, tslib_1.__exportStar)(__webpack_require__("./libs/data/src/user/interfaces/user.interface.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/data/src/user/enum/role.enum.ts"), exports);


/***/ }),

/***/ "./libs/data/src/user/enum/role.enum.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleEnum = void 0;
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["Admin"] = "admin";
    RoleEnum["Moderator"] = "moderator";
    RoleEnum["User"] = "user";
})(RoleEnum = exports.RoleEnum || (exports.RoleEnum = {}));


/***/ }),

/***/ "./libs/data/src/user/interfaces/user.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/mongoose":
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),

/***/ "@nestjs/passport":
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/serve-static":
/***/ ((module) => {

module.exports = require("@nestjs/serve-static");

/***/ }),

/***/ "@nestjs/throttler":
/***/ ((module) => {

module.exports = require("@nestjs/throttler");

/***/ }),

/***/ "bcrypt":
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "cookie-parser":
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "helmet":
/***/ ((module) => {

module.exports = require("helmet");

/***/ }),

/***/ "mongoose":
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "passport-jwt":
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "passport-local":
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),

/***/ "rand-token":
/***/ ((module) => {

module.exports = require("rand-token");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "uuid":
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const cookie_parser_1 = (0, tslib_1.__importDefault)(__webpack_require__("cookie-parser"));
const helmet_1 = (0, tslib_1.__importDefault)(__webpack_require__("helmet"));
const app_module_1 = __webpack_require__("./apps/api/src/app/app.module.ts");
function bootstrap() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        app.use((0, helmet_1.default)());
        app.use((0, cookie_parser_1.default)());
        app.enableCors({
            origin: 'http://localhost:4200',
            credentials: true
        });
        const port = process.env.PORT || 3000;
        yield app.listen(port, '0.0.0.0');
        common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map