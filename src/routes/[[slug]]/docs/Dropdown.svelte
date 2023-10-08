<script lang="ts">
	import ActionListItem from './../../../lib/components/ActionList/ActionListItem.svelte';
	import ActionList from './../../../lib/components/ActionList/ActionList.svelte';
	import Dropdown from '$lib/components/Dropdown/Dropdown.svelte';
    import Button from '$lib/components/Button/Button.svelte';

    import hyvorTalkLogo from "../../img/logo/hyvor-talk-social.png";
    import hyvorBlogsLogo from "../../img/logo/hyvor-blogs-social.png";
    import Avatar from "../../../lib/components/Avatar/Avatar.svelte";
    import Text from "../../../lib/components/Text/Text.svelte";
    import CodeBlock from "../../../lib/marketing/Docs/Content/CodeBlock.svelte";
    import CodeResult from "./Helper/CodeResult.svelte";
    import ActionListGroup from "../../../lib/components/ActionList/ActionListGroup.svelte";
    import { IconCaretDown } from "@hyvor/icons";

    let x1 = 'talk';
    let x2 : string[] = [];

    let x3 : string[] = [];
    let x4 = 'starter';

    let s1 = true;
    let s2 = true;
    let s3 = true;
    let s4 = true;


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
    Dropdowns are used to show a list of options when a user clicks on a button. Use the <a href="action-list">Action List</a> component to show the actions in the dropdown.
</p>

<h2 id="examples">Examples</h2>

<p>
    In the below examples, we use <code>relative</code> and <code>closeOnOutsideClick={false}</code> properties for demonstration purposes. However, in most cases, they are not needed.
</p>

<h3 id="basic">Basic</h3>

<CodeBlock code={`
    <Dropdown bind:show={showDropdown}>
        <Button slot="trigger" color="light">
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
`} language="svelte" />

<CodeResult>
    <Dropdown bind:show={s1} relative closeOnOutsideClick={false}>
        <Button slot="trigger" color="light">
            Page <IconCaretDown slot="end" />
        </Button>
        <ActionList slot="content">
            {#each [1,2,3] as i}
                <ActionListItem on:select={() => {s1 = false}}>
                    Action {i}
                </ActionListItem>
            {/each}
        </ActionList>
    </Dropdown>
</CodeResult>

<h3 id="single-selection">Single Selection</h3>

<p>
    Here's a little more complex example. The key is to set <code>selection="single"</code> in the <a href="action-list">Action List</a> component.
</p>

<CodeBlock code={`
    <Dropdown bind:show={showDropdown} width={350}>
        <Button slot="trigger" color="light">
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
`} language="svelte" />

<CodeResult>
    <Dropdown bind:show={s2} relative width={350} closeOnOutsideClick={false}>
        <Button slot="trigger" color="light">
            <Text light small slot="start">Product</Text>
            
            {#if x1 === 'talk'}
                <Avatar src={hyvorTalkLogo} size={18} />
                <Text normal style="margin-left:5px;">Hyvor Talk</Text>
            {:else}
                <Avatar src={hyvorBlogsLogo} size={18} />
                <Text normal style="margin-left:5px;">Hyvor Blogs</Text>
            {/if}

            <IconCaretDown slot="end" />
        </Button>
        <ActionList slot="content" selection="single">
            <ActionListItem selected={x1 === 'talk'} on:select={() => {x1 = 'talk'}}>
                <Avatar slot="start" src={hyvorTalkLogo} size="small" />
                Hyvor Talk
                <div slot="description">Commenting Platform</div>
            </ActionListItem>
            <ActionListItem selected={x1 === 'blogs'} on:select={() => {x1 = 'blogs';}}>
                <Avatar slot="start" src={hyvorBlogsLogo} size="small" />
                Hyvor Blogs
                <div slot="description">Blogging Platform</div>
            </ActionListItem>
        </ActionList>
    </Dropdown>
</CodeResult>

<h3 id="multi-selection">
    Multi Selection
</h3>

<p>
    For multi selections, use <code>selection="multiple"</code> in the <a href="action-list">Action List</a> component.
</p>

<CodeBlock code={`
    <Dropdown bind:show={showDropdown} width={350}>
        <Button slot="trigger" color="light">
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

    <` + `script lang="ts">
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
`} language="svelte" />

<CodeResult>

    <Dropdown bind:show={s3} relative width={350} closeOnOutsideClick={false}>
        <Button slot="trigger" color="light">
            Select Products ({x2.length})
            <IconCaretDown slot="end" />
        </Button>
        <ActionList slot="content" selection="multi">
            <ActionListItem selected={x2.includes('talk')} on:select={() => handleX2Select('talk')}>
                <Avatar slot="start" src={hyvorTalkLogo} size="small" />
                Hyvor Talk
                <div slot="description">Commenting Platform</div>
            </ActionListItem>
            <ActionListItem selected={x2.includes('blogs')} on:select={() => handleX2Select('blogs')}>
                <Avatar slot="start" src={hyvorBlogsLogo} size="small" />
                Hyvor Blogs
                <div slot="description">Blogging Platform</div>
            </ActionListItem>
        </ActionList>
    </Dropdown>

</CodeResult>

<h3 id="groups-and-slots">
    Groups and Slots
</h3>

<p>
    Here is an example using <code>{"<ActionListGroup>"}</code> and other slots in the <a href="action-list">Action List</a> component.
</p>

<CodeBlock code={`
    <Dropdown bind:show={showDropdown} width={350}>
        <Button slot="trigger" color="light">
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
`} language="svelte" />

<CodeResult>

    <Dropdown bind:show={s4} relative width={350} closeOnOutsideClick={false}>
        <Button slot="trigger" color="light">
            Filter Results
            <IconCaretDown slot="end" />
        </Button>
        <ActionList slot="content">
            <ActionListGroup selection="multi" title="Product">
                <ActionListItem selected={x3.includes('talk')} on:select={() => handleX3Select('talk')}>
                    <Avatar slot="start" src={hyvorTalkLogo} size="small" />
                    Hyvor Talk
                    <div slot="description">Commenting Platform</div>
                </ActionListItem>
                <ActionListItem selected={x3.includes('blogs')} on:select={() => handleX3Select('blogs')}>
                    <Avatar slot="start" src={hyvorBlogsLogo} size="small" />
                    Hyvor Blogs
                    <div slot="description">Blogging Platform</div>
                </ActionListItem>
            </ActionListGroup>
            <ActionListGroup selection="single" title="Plan" divider>
                <ActionListItem selected={x4 === 'starter'} on:select={() => x4 = 'starter'}>
                    Starter
                    <Text small light slot="end">$9/month</Text>
                </ActionListItem>
                <ActionListItem selected={x4 === 'growth'} on:select={() => x4 = 'growth'}>
                    Growth
                    <Text small light slot="end">$19/month</Text>
                </ActionListItem>
                <ActionListItem selected={x4 === 'premium'} on:select={() => x4 = 'premium'}>
                    Premium
                    <Text small light slot="end">$49/month</Text>
                </ActionListItem>
            </ActionListGroup>
        </ActionList>
    </Dropdown>

</CodeResult>
