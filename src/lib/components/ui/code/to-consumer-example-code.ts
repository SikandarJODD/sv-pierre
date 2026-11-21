const INTERNAL_PACKAGE_ENTRY = '#lib/pierre/words/index.js';
const PUBLIC_PACKAGE_ENTRY = '@sv-pierre/words';

export function toConsumerExampleCode(code: string): string {
	return code.replaceAll(INTERNAL_PACKAGE_ENTRY, PUBLIC_PACKAGE_ENTRY);
}
