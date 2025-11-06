<script lang="ts">
	import { InternationalizationService } from './../../lib/components/Internationalization/i18n.js';
	import { onMount, getContext, setContext } from 'svelte';
	import PricingLink from './stringComponents/PricingLink.svelte';
	import ChangeButton from './ChangeButton.svelte';
	import LanguageToggle from '../../lib/components/Internationalization/LanguageToggle.svelte';
	import TextInput from '../../lib/components/TextInput/TextInput.svelte';
	import enJson from './locale/en.json' with { type: 'json' };
	import type { ToDotPaths } from '$lib/components/Internationalization/types.js';
	import Context from './stringComponents/Context.svelte';
	import HyvorBar from '$lib/components/HyvorBar/HyvorBar.svelte';

	let name = $state('Supun');
	let dynamicValue = $state('');
	let dynamicValue2 = $state('');

	const i18n = getContext<InternationalizationService>('i18n');
	const Intl = getContext<InternationalizationService<typeof enJson>>('i18n');

	setContext('my-context', 'My Context');

	onMount(() => {
		dynamicValue = 'Loading...';
		dynamicValue2 = 'Loading...';
		setTimeout(() => {
			dynamicValue = Intl.t('welcome', {});
			dynamicValue2 = Intl.t('welcome');
		}, 1000);
	});

	let changingKey = $state('welcome' as ToDotPaths<typeof enJson>);

	let orgSwitchMessage = $state('');
</script>

<HyvorBar
	product="core"
	config={{
		name: 'Hyvor Design',
		docs: false
	}}
	authOverride={{
		user: {
			name: 'Supun',
			email: 'supun@example.com',
			picture_url: null,
			current_organization_name: 'HYVOR'
		},
		logoutUrl: 'https://hyvor.com/logout'
	}}
	onOrganizationSwitch={(org) => {
		orgSwitchMessage = `Switched to organization: ${org.name} (Role: ${org.role}, ID: ${org.id})`;
	}}
/>

<div style="margin-top:20px;padding: 30px">
	{orgSwitchMessage}
	<ChangeButton />
	<TextInput bind:value={name} />
	<div>
		<Intl.T key="welcome" /> <br />
		<Intl.T key="welcome" /> <br />
		{Intl.t('welcome')} <br />
		{dynamicValue} <br />
		{dynamicValue2}
	</div>
	<div>
		<Intl.T key="by" params={{ name }} />
	</div>
	<div>
		<Intl.T
			key="advanced"
			params={{
				a: { component: PricingLink }
			}}
		/>
	</div>

	<div>
		With context:
		<Intl.T
			key="advanced"
			params={{
				a: { component: Context }
			}}
		/>
	</div>

	<div>
		Element with props:
		<Intl.T
			key="advanced"
			params={{
				a: {
					element: 'a',
					props: {
						class: 'hds-link',
						href: 'https://hyvor.com',
						target: '_blank'
					}
				}
			}}
		/>
	</div>

	<div>
		<Intl.T
			key="dates.start"
			params={{
				date: new Date()
			}}
		/>
	</div>
	<div>
		<Intl.T key="price" params={{ price: 100 }} />
	</div>
	<div>
		<Intl.T key="users" params={{ count: 10 }} />
		<Intl.T key="users" params={{ count: 1 }} />
	</div>
	<div>
		<Intl.T key="element" params={{ b: { element: 'b' } }} />
	</div>
	<div>
		<Intl.T key={changingKey} />
		<button style="background-color:#888;" onclick={() => (changingKey = 'welcome2')}
			>Change key</button
		>
	</div>
</div>

<div style="padding: 200px;">
	<LanguageToggle align="center" size="small" staticPage />
</div>
