import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";


export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Antes ....')

        const now = Date.now()

        return next
            .handle()
            .pipe(
                tap(() => console.log(`Depois.... ${Date.now() - now}ms`))
            )
    }

}