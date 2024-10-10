import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { JwtPayload } from 'src/user/intertfaces/jwt-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService){}


  canActivate( context: ExecutionContext ): boolean | Promise<boolean> | Observable<boolean> {
    let request:Request = context.switchToHttp().getRequest()
    const token = request.headers['token']
    if (!token){
      throw new UnauthorizedException('Debe enviar un token')
    }
    try{
      const payload = this.jwtService.verify<JwtPayload>(token);
      request.body['userId'] = payload.id;
    }
    catch(error){
      throw new UnauthorizedException('Debe enviar un token')
    }

    return true
  }
}
