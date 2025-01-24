import { legacyPlugin } from '@backstage/backend-common';
import { createBackend } from '@backstage/backend-defaults';

const backend = createBackend();
backend.add(legacyPlugin('auth', import('./plugins/auth')));
backend.add(legacyPlugin('catalog', import('./plugins/catalog')));
backend.add(legacyPlugin('gitlab', import('./plugins/gitlab')));
backend.add(legacyPlugin('proxy', import('./plugins/proxy')));
backend.add(legacyPlugin('scaffolder', import('./plugins/scaffolder')));
backend.add(legacyPlugin('search', import('./plugins/search')));
backend.add(legacyPlugin('techdocs', import('./plugins/techdocs')));

backend.start();
