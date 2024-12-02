export interface refreshingTokenResponse {
  message: string;
  access_token: string;
  refresh_token: string;
}

export interface DecodedToken {
    exp: number;
    iat: number;
    jti: string;
    user_id: number;
    token_type: string;
  }
  
  export interface DecodedAccessToken extends DecodedToken {
    token_type: 'access';
  }
  
  export interface DecodedRefreshToken extends DecodedToken {
    token_type: 'refresh';
  }
