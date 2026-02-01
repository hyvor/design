<script lang="ts">
	import ActionListItem from '$lib/components/ActionList/ActionListItem.svelte';
	import ActionList from '$lib/components/ActionList/ActionList.svelte';
	import Dropdown from '$lib/components/Dropdown/Dropdown.svelte';
	import Button from '$lib/components/Button/Button.svelte';

	import hyvorTalkLogo from '../../../img/logo/hyvor-talk-social.png';
	import hyvorBlogsLogo from '../../../img/logo/hyvor-blogs-social.png';
	import Avatar from '$lib/components/Avatar/Avatar.svelte';
	import Text from '$lib/components/Text/Text.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
	import ActionListGroup from '$lib/components/ActionList/ActionListGroup.svelte';
	import IconCaretDown from '@hyvor/icons/IconCaretDown';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import InputGroup from '$lib/components/FormControl/InputGroup.svelte';
	import Radio from '$lib/components/Radio/Radio.svelte';
	import SplitControl from '$lib/components/SplitControl/SplitControl.svelte';

	let x1 = $state('talk');
	let x2: string[] = $state([]);

	let x3: string[] = $state([]);
	let x4 = $state('starter');

	let s1 = $state(true);
	let s2 = $state(true);
	let s3 = $state(true);
	let s4 = $state(true);

	//dropdown align and position states
	let paAlign: 'start' | 'center' | 'end' = $state('start');
	let paPosition: 'top' | 'bottom' | 'left' | 'right' = $state('bottom');

	function handleX2Select(val: string) {
		if (x2.includes(val)) {
			x2 = x2.filter((v) => v !== val);
		} else {
			x2 = [...x2, val];
		}
	}
	function handleX3Select(val: string) {
		if (x3.includes(val)) {
			x3 = x3.filter((v) => v !== val);
		} else {
			x3 = [...x3, val];
		}
	}
</script>

<h1>Dropdown</h1>

<p>
	Dropdowns are used to show a list of options when a user clicks on a button. Use the <a
		href="action-list">Action List</a
	> component to show the actions in the dropdown.
</p>

<h2 id="props">Properties</h2>

<Table columns="2fr 2fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>align</code></div>
		<div><code>start</code></div>
		<div>
			Alignment of the dropdown. One of:
			<ul>
				<li><code>start</code></li>
				<li><code>center</code></li>
				<li><code>end</code></li>
			</ul>
		</div>
	</TableRow>

	<TableRow>
		<div><code>position</code></div>
		<div><code>bottom</code></div>
		<div>
			Position of the dropdown. One of:
			<ul>
				<li><code>top</code></li>
				<li><code>bottom</code></li>
				<li><code>left</code></li>
				<li><code>right</code></li>
			</ul>
		</div>
	</TableRow>

	<TableRow>
		<div><code>closeOnOutsideClick</code></div>
		<div><code>true</code></div>
		<div>Whether the dropdown should be closed when the user clicks outside of the dropdown.</div>
	</TableRow>

	<TableRow>
		<div><code>show</code></div>
		<div><code>false</code></div>
		<div>
			Whether the dropdown should be shown or not. Use this property to control the dropdown.
		</div>
	</TableRow>

	<TableRow>
		<div><code>width</code></div>
		<div><code>225</code></div>
		<div>Width of the dropdown.</div>
	</TableRow>

	<TableRow>
		<div><code>relative</code></div>
		<div><code>false</code></div>
		<div>Whether the dropdown should be positioned relative to the trigger element.</div>
	</TableRow>
</Table>

<h2 id="examples">Examples</h2>

<p>
	In the below examples, we use <code>relative</code> and
	<code>closeOnOutsideClick={false}</code> properties for demonstration purposes. However, in most cases,
	they are not needed.
</p>

<h3 id="basic">Basic</h3>

<CodeBlock
	code={`
    <Dropdown bind:show={showDropdown}>
        <Button slot="trigger" color="gray">
            Page <IconCaretDown slot="end" />
        </Button>
        <ActionList slot="content">
            {#each [1,2,3] as i}
                <ActionListItem on:select={() => {showDropdown = false}}>
                    Action {i}
                </ActionListItem>
            {/each}
        </ActionList>
    </Dropdown>
`}
	language="svelte"
/>

<CodeResult>
	<Dropdown bind:show={s1} relative closeOnOutsideClick={false}>
		{#snippet trigger()}
			<Button color="gray">
				Page {#snippet end()}
					<IconCaretDown />
				{/snippet}
			</Button>
		{/snippet}
		{#snippet content()}
			<ActionList>
				{#each [1, 2, 3] as i}
					<ActionListItem
						on:select={() => {
							s1 = false;
						}}
					>
						Action {i}
					</ActionListItem>
				{/each}
			</ActionList>
		{/snippet}
	</Dropdown>
</CodeResult>

<h3 id="single-selection">Single Selection</h3>

<p>
	Here's a little more complex example. The key is to set <code>selection="single"</code>
	in the <a href="action-list">Action List</a> component.
</p>

<CodeBlock
	code={`
    <Dropdown bind:show={showDropdown} width={350}>
        <Button slot="trigger" color="gray">
            <Text light small slot="start">Product</Text>
            
            {#if currentItem === 'talk'}
                <Avatar src={hyvorTalkLogo} size={18} />
                <Text normal style="margin-left:5px;">Hyvor Talk</Text>
            {:else}
                <Avatar src={hyvorBlogsLogo} size={18} />
                <Text normal style="margin-left:5px;">Hyvor Blogs</Text>
            {/if}

            <IconCaretDown slot="end" />
        </Button>
        <ActionList slot="content" selection="single">
            <ActionListItem 
                selected={currentItem === 'talk'} 
                on:select={() => currentItem = 'talk'}
            >
                <Avatar slot="start" src={hyvorTalkLogo} size="small" />
                Hyvor Talk
                <div slot="description">Commenting Platform</div>
            </ActionListItem>
            <ActionListItem 
                selected={currentItem === 'blogs'} 
                on:select={() => currentItem = 'blogs'}
            >
                <Avatar slot="start" src={hyvorBlogsLogo} size="small" />
                Hyvor Blogs
                <div slot="description">Blogging Platform</div>
            </ActionListItem>
        </ActionList>
    </Dropdown>
`}
	language="svelte"
/>

<CodeResult>
	<Dropdown bind:show={s2} relative width={350} closeOnOutsideClick={false}>
		{#snippet trigger()}
			<Button color="gray">
				{#snippet start()}
					<Text light small>Product</Text>
				{/snippet}

				{#if x1 === 'talk'}
					<Avatar src={hyvorTalkLogo} size={18} />
					<Text normal style="margin-left:5px;">Hyvor Talk</Text>
				{:else}
					<Avatar src={hyvorBlogsLogo} size={18} />
					<Text normal style="margin-left:5px;">Hyvor Blogs</Text>
				{/if}

				{#snippet end()}
					<IconCaretDown />
				{/snippet}
			</Button>
		{/snippet}
		{#snippet content()}
			<ActionList selection="single">
				<ActionListItem
					selected={x1 === 'talk'}
					on:select={() => {
						x1 = 'talk';
					}}
				>
					{#snippet start()}
						<Avatar src={hyvorTalkLogo} size="small" />
					{/snippet}
					Hyvor Talk
					{#snippet description()}
						<div>Commenting Platform</div>
					{/snippet}
				</ActionListItem>
				<ActionListItem
					selected={x1 === 'blogs'}
					on:select={() => {
						x1 = 'blogs';
					}}
				>
					{#snippet start()}
						<Avatar src={hyvorBlogsLogo} size="small" />
					{/snippet}
					Hyvor Blogs
					{#snippet description()}
						<div>Blogging Platform</div>
					{/snippet}
				</ActionListItem>
			</ActionList>
		{/snippet}
	</Dropdown>
</CodeResult>

<h3 id="multi-selection">Multi Selection</h3>

<p>
	For multi selections, use <code>selection="multiple"</code> in the
	<a href="action-list">Action List</a> component.
</p>

<CodeBlock
	code={`
    <Dropdown bind:show={showDropdown} width={350}>
        <Button slot="trigger" color="gray">
            Select Products ({currentProducts.length})
            <IconCaretDown slot="end" />
        </Button>
        <ActionList slot="content" selection="multi">
            <ActionListItem 
                selected={currentProducts.includes('talk')} 
                on:select={() => handleProductSelect('talk')}>
                <Avatar slot="start" src={hyvorTalkLogo} size="small" />
                Hyvor Talk
                <div slot="description">Commenting Platform</div>
            </ActionListItem>
            <ActionListItem 
                selected={currentProducts.includes('blogs')} 
                on:select={() => handleProductSelect('blogs')}
            >
                <Avatar slot="start" src={hyvorBlogsLogo} size="small" />
                Hyvor Blogs
                <div slot="description">Blogging Platform</div>
            </ActionListItem>
        </ActionList>
    </Dropdown>

    <` +
		`script lang="ts">
        let showDropdown = false;
        let currentProducts : string[] = [];

        function handleProductSelect(val: string) {
            if (currentProducts.includes(val)) {
                currentProducts = currentProducts.filter((v) => v !== val);
            } else {
                currentProducts = [...currentProducts, val];
            }
        }
    </script>
`}
	language="svelte"
/>

<CodeResult>
	<Dropdown bind:show={s3} relative width={350} closeOnOutsideClick={false}>
		{#snippet trigger()}
			<Button color="gray">
				Select Products ({x2.length})
				{#snippet end()}
					<IconCaretDown />
				{/snippet}
			</Button>
		{/snippet}
		{#snippet content()}
			<ActionList selection="multi">
				<ActionListItem selected={x2.includes('talk')} on:select={() => handleX2Select('talk')}>
					{#snippet start()}
						<Avatar src={hyvorTalkLogo} size="small" />
					{/snippet}
					Hyvor Talk
					{#snippet description()}
						<div>Commenting Platform</div>
					{/snippet}
				</ActionListItem>
				<ActionListItem selected={x2.includes('blogs')} on:select={() => handleX2Select('blogs')}>
					{#snippet start()}
						<Avatar src={hyvorBlogsLogo} size="small" />
					{/snippet}
					Hyvor Blogs
					{#snippet description()}
						<div>Blogging Platform</div>
					{/snippet}
				</ActionListItem>
			</ActionList>
		{/snippet}
	</Dropdown>
</CodeResult>

<h3 id="groups-and-slots">Groups and Slots</h3>

<p>
	Here is an example using <code>{'<ActionListGroup>'}</code> and other slots in the
	<a href="action-list">Action List</a> component.
</p>

<CodeBlock
	code={`
    <Dropdown bind:show={showDropdown} width={350}>
        <Button slot="trigger" color="gray">
            Filter Results
            <IconCaretDown slot="end" />
        </Button>
        <ActionList slot="content">
            <ActionListGroup selection="multi" title="Product">
                <ActionListItem selected={currentProducts.includes('talk')} on:select={() => handleProductSelect('talk')}>
                    <Avatar slot="start" src={hyvorTalkLogo} size="small" />
                    Hyvor Talk
                    <div slot="description">Commenting Platform</div>
                </ActionListItem>
                <ActionListItem selected={currentProducts.includes('blogs')} on:select={() => handleProductSelect('blogs')}>
                    <Avatar slot="start" src={hyvorBlogsLogo} size="small" />
                    Hyvor Blogs
                    <div slot="description">Blogging Platform</div>
                </ActionListItem>
            </ActionListGroup>
            <ActionListGroup selection="single" title="Plan" divider>
                <ActionListItem selected={currentPlan === 'starter'} on:select={() => currentPlan = 'starter'}>
                    Starter
                    <Text small light slot="end">$9/month</Text>
                </ActionListItem>
                <ActionListItem selected={currentPlan === 'growth'} on:select={() => currentPlan = 'growth'}>
                    Growth
                    <Text small light slot="end">$19/month</Text>
                </ActionListItem>
                <ActionListItem selected={currentPlan === 'premium'} on:select={() => currentPlan = 'premium'}>
                    Premium
                    <Text small light slot="end">$49/month</Text>
                </ActionListItem>
            </ActionListGroup>
        </ActionList>
    </Dropdown>
`}
	language="svelte"
/>

<CodeResult>
	<Dropdown bind:show={s4} relative width={350} closeOnOutsideClick={false}>
		{#snippet trigger()}
			<Button color="gray">
				Filter Results
				{#snippet end()}
					<IconCaretDown />
				{/snippet}
			</Button>
		{/snippet}
		{#snippet content()}
			<ActionList>
				<ActionListGroup selection="multi" title="Product">
					<ActionListItem selected={x3.includes('talk')} on:select={() => handleX3Select('talk')}>
						{#snippet start()}
							<Avatar src={hyvorTalkLogo} size="small" />
						{/snippet}
						Hyvor Talk
						{#snippet description()}
							<div>Commenting Platform</div>
						{/snippet}
					</ActionListItem>
					<ActionListItem selected={x3.includes('blogs')} on:select={() => handleX3Select('blogs')}>
						{#snippet start()}
							<Avatar src={hyvorBlogsLogo} size="small" />
						{/snippet}
						Hyvor Blogs
						{#snippet description()}
							<div>Blogging Platform</div>
						{/snippet}
					</ActionListItem>
				</ActionListGroup>
				<ActionListGroup selection="single" title="Plan" divider>
					<ActionListItem selected={x4 === 'starter'} on:select={() => (x4 = 'starter')}>
						Starter
						{#snippet end()}
							<Text small light>$9/month</Text>
						{/snippet}
					</ActionListItem>
					<ActionListItem selected={x4 === 'growth'} on:select={() => (x4 = 'growth')}>
						Growth
						{#snippet end()}
							<Text small light>$19/month</Text>
						{/snippet}
					</ActionListItem>
					<ActionListItem selected={x4 === 'premium'} on:select={() => (x4 = 'premium')}>
						Premium
						{#snippet end()}
							<Text small light>$49/month</Text>
						{/snippet}
					</ActionListItem>
				</ActionListGroup>
			</ActionList>
		{/snippet}
	</Dropdown>
</CodeResult>

<h2 id="">Positioning and Alignment</h2>

<CodeResult>
	<SplitControl label="Position" caption="Position of the dropdown">
		<InputGroup>
			<Radio name="paPosition" value="top" bind:group={paPosition}>Top</Radio>
			<Radio name="paPosition" value="bottom" bind:group={paPosition}>Bottom</Radio>
			<Radio name="paPosition" value="left" bind:group={paPosition}>Left</Radio>
			<Radio name="paPosition" value="right" bind:group={paPosition}>Right</Radio>
		</InputGroup>
	</SplitControl>

	<SplitControl label="Align" caption="Alignment of the dropdown">
		<InputGroup>
			<Radio name="paAlign" value="start" bind:group={paAlign}>Start</Radio>
			<Radio name="paAlign" value="center" bind:group={paAlign}>Center</Radio>
			<Radio name="paAlign" value="end" bind:group={paAlign}>End</Radio>
		</InputGroup>
	</SplitControl>

	<div style="margin-top:120px; left:auto; margin-bottom:120px; text-align: center;">
		<Dropdown bind:show={s1} closeOnOutsideClick={false} align={paAlign} position={paPosition}>
			{#snippet trigger()}
				<Button color="gray">
					Filter Results
					{#snippet end()}
						<IconCaretDown />
					{/snippet}
				</Button>
			{/snippet}

			{#snippet content()}
				<ActionList>
					{#each [1, 2, 3] as i}
						<ActionListItem
							on:select={() => {
								s1 = false;
							}}
						>
							Action {i}
						</ActionListItem>
					{/each}
				</ActionList>
			{/snippet}
		</Dropdown>
	</div>
</CodeResult>
