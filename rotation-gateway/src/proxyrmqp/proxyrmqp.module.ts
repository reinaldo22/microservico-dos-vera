import { Module } from '@nestjs/common';
import { ProxySmartRotation } from './client-proxy';

@Module({

    providers: [ProxySmartRotation],
    exports: [ProxySmartRotation]
})
export class ProxyrmqpModule { }
