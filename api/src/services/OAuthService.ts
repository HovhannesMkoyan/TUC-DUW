import getGeoInformation from "../helpers/getGeoInformation";

export default class OAuthService {
  private userService: any;
  private userMapper: any;
  private userRepository: any;

  constructor({
    userService,
    userMapper,
    userRepository,
  }: {
    userService: any;
    userMapper: any;
    userRepository: any;
  }) {
    this.userService = userService;
    this.userMapper = userMapper;
    this.userRepository = userRepository;
  }

  async authenticate(ip: any, userData: any): Promise<any> {
    const { provider, provider_id, email, firstname, lastname } = userData;

    const user = await this.userService.getByEmail(email);
    if (user) {
      if (user.provider !== provider) {
        throw {
          success: false,
          message: "Էլ. հասցեն օգտգործվում է այլ հաշվում",
          code: 403,
        };
      }
      return this.userMapper.toEntity(user);
    } else {
      const detailed_geo_info = await getGeoInformation("212.58.103.7");

      // Create user DB Object
      const listingDBObject = await this.userMapper.toDatabase({
        firstname,
        lastname,
        email,
        detailed_geo_info,
        provider,
        provider_id,
      });

      // Insert into DB
      try {
        const newUser = await this.userRepository.createUser(listingDBObject);
        return this.userMapper.toEntity(newUser);
      } catch (error: any) {
        if (error.message.includes("UniqueConstraint")) {
          throw {
            success: false,
            message: "Այսպիսի էլ. հասցեով հաշիվ արդեն գոյություն ունի",
            code: 403,
          };
        } else {
          throw {
            success: false,
            message: error.message,
            code: 400,
          };
        }
      }
    }
  }
}
