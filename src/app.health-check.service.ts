import { Injectable } from '@nestjs/common';
import {
  TerminusEndpoint,
  TerminusOptionsFactory,
  TerminusModuleOptions
} from '@nestjs/terminus';

import { prefix } from './main';

@Injectable()
export class HealthCheckService implements TerminusOptionsFactory {
  createTerminusOptions(): TerminusModuleOptions {
    const healthEndpoint: TerminusEndpoint = {
      url: `${prefix}/health-check`,
      healthIndicators: [
        // TODO: Database test connection
        async () => ({ health: {
          "status": "ok",
        }}),
      ],
    };
    return {
      endpoints: [healthEndpoint],
    };
  }
}
