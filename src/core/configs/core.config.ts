import { validateEnvVars } from '@/core/configs/validate.utils';
import { registerAs } from '@nestjs/config';
import { z } from 'zod';

/**
 * ###########
 * ### Env ###
 * ###########
 */

const CORE_ENV_VARS = {
  POSTMARK_SERVER_API_TOKEN: 'POSTMARK_SERVER_API_TOKEN',
  POSTMARK_SENDER_EMAIL: 'POSTMARK_SENDER_EMAIL',
} as const;

const CoreEnvVarsSchema = z.object({
  [CORE_ENV_VARS.POSTMARK_SERVER_API_TOKEN]: z.string(),
  [CORE_ENV_VARS.POSTMARK_SENDER_EMAIL]: z.string(),
});

export function validateCoreEnvVars(env: Record<string, string | undefined>) {
  return validateEnvVars(CoreEnvVarsSchema, env);
}

/**
 * ##############
 * ### Config ###
 * ##############
 */

const CORE_CONFIG_NAMESPACE = 'core';

const CoreConfigSchema = z.object({
  postmark: z.object({
    serverApiToken: z.string(),
    senderEmail: z.string(),
  }),
});

type CoreConfig = z.infer<typeof CoreConfigSchema>;

export interface NamespacedCoreConfig {
  [CORE_CONFIG_NAMESPACE]: CoreConfig;
}

export const coreConfig = registerAs(
  CORE_CONFIG_NAMESPACE,
  () =>
    ({
      postmark: {
        serverApiToken: process.env[CORE_ENV_VARS.POSTMARK_SERVER_API_TOKEN],
        senderEmail: process.env[CORE_ENV_VARS.POSTMARK_SENDER_EMAIL],
      },
    }) as CoreConfig,
);
