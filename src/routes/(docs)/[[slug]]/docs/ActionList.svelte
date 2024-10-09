<script lang="ts">
  import Text from "$lib/components/Text/Text.svelte";
  import ActionListGroup from "$lib/components/ActionList/ActionListGroup.svelte";
  import ActionListItem from "$lib/components/ActionList/ActionListItem.svelte";
  import ActionList from "$lib/components/ActionList/ActionList.svelte";
  import CodeResult from "./Helper/CodeResult.svelte";
  import Table from "$lib/components/Table/Table.svelte";
  import TableRow from "$lib/components/Table/TableRow.svelte";
  import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte";
  import { IconHandThumbsUp, IconPencil, IconTrash } from "@hyvor/icons";

  let x1 = 1;
  let x11 = 1;
  let x2: number[] = [];
  let x22: number[] = [];

  let x3 = 1;
  let x4: number[] = [];
</script>

<h1>Action List</h1>

<p>
  Action List is a list of actions. It is primarily used with <a href="dropdown"
    >Dropdowns</a
  >. There are few components that helps to build an action list.
</p>

<ul>
  <li>
    <code>{"<ActionList>"}</code> - The container
  </li>
  <li>
    <code>{"<ActionListItem>"}</code> - An item
  </li>
  <li>
    <code>{"<ActionListGroup>"}</code> - A group wrapper with a title and a divider
  </li>
</ul>

<h2 id="props-slots">Properties and Slots</h2>

<h3 id="action-list">ActionList</h3>

<h4 id="action-list-props">Properties</h4>

<Table columns="2fr 2fr 3fr">
  <TableRow head>
    <div>Name</div>
    <div>Default</div>
    <div>Description</div>
  </TableRow>

  <TableRow>
    <div><code>selection</code></div>
    <div><code>none</code></div>
    <div>
      The selection mode. One of:
      <ul>
        <li><code>none</code></li>
        <li><code>single</code></li>
        <li><code>multi</code></li>
      </ul>
    </div>
  </TableRow>

  <TableRow>
    <div><code>selectionAlign</code></div>
    <div><code>start</code></div>
    <div>
      The alignment of the selection indicator (tick or checkbox) in items. One
      of:
      <ul>
        <li><code>start</code></li>
        <li><code>end</code></li>
      </ul>
    </div>
  </TableRow>
</Table>

<h4 id="action-list-slots">Slots</h4>

<Table columns="1fr 3fr">
  <TableRow head>
    <div>Name</div>
    <div>Description</div>
  </TableRow>

  <TableRow>
    <div><code>default</code></div>
    <div>The content of the action list.</div>
  </TableRow>
</Table>

<h3 id="action-list-item">ActionListItem</h3>

<h4 id="action-list-item-props">Properties</h4>

<Table columns="2fr 2fr 4fr">
  <TableRow head>
    <div>Name</div>
    <div>Default</div>
    <div>Description</div>
  </TableRow>

  <TableRow>
    <div><code>selected</code></div>
    <div><code>false</code></div>
    <div>
      Whether the item is selected or not. Only works when the <code
        >selection</code
      >
      property of the <code>{"<ActionList>"}</code> is set.
    </div>
  </TableRow>

  <TableRow>
    <div><code>disabled</code></div>
    <div><code>false</code></div>
    <div>Whether the item is disabled or not.</div>
  </TableRow>

  <TableRow>
    <div><code>type</code></div>
    <div><code>default</code></div>
    <div>
      <code>default</code> or <code>danger</code>
    </div>
  </TableRow>
</Table>

<h4 id="action-list-item-events">Events</h4>

<p>
  A <code>select</code> event is emitted when the item is clicked/selected. See the
  examples below.
</p>

<Table columns="1fr 3fr">
  <TableRow head>
    <div>Name</div>
    <div>Description</div>
  </TableRow>

  <TableRow>
    <div><code>select</code></div>
    <div>Emitted when the item is selected.</div>
  </TableRow>
</Table>

<h4 id="action-list-item-slots">Slots</h4>

<Table columns="1fr 3fr">
  <TableRow head>
    <div>Name</div>
    <div>Default</div>
  </TableRow>

  <TableRow>
    <div><code>default</code></div>
    <div>The content of the action list item.</div>
  </TableRow>

  <TableRow>
    <div><code>description</code></div>
    <div>
      The description of the action list item. See <a href="#descriptions"
        >Descriptions</a
      >.
    </div>
  </TableRow>

  <TableRow>
    <div><code>start</code></div>
    <div>The content of the start slot (left side).</div>
  </TableRow>

  <TableRow>
    <div><code>end</code></div>
    <div>The content of the end slot (right side).</div>
  </TableRow>
</Table>

<h3 id="action-list-group">ActionListGroup</h3>

<h4 id="action-list-group-props">Properties</h4>

<Table columns="2fr 2fr 4fr">
  <TableRow head>
    <div>Name</div>
    <div>Default</div>
    <div>Description</div>
  </TableRow>

  <TableRow>
    <div><code>title</code></div>
    <div></div>
    <div>The title of the group.</div>
  </TableRow>

  <TableRow>
    <div><code>divider</code></div>
    <div><code>false</code></div>
    <div>Whether to show a divider or not.</div>
  </TableRow>

  <TableRow>
    <div><code>selection</code></div>
    <div><code>none</code></div>
    <div>
      Override the selection mode of the <code>{"<ActionList>"}</code>
      component. One of:
      <ul>
        <li><code>none</code></li>
        <li><code>single</code></li>
        <li><code>multi</code></li>
      </ul>
      See<a href="#group-selection">Group Selection</a>.
    </div>
  </TableRow>
</Table>

<h2 id="examples">Examples</h2>

<h3 id="basic">Basic</h3>

<CodeBlock
  code={`
    <ActionList>
        <ActionListItem>Show Details</ActionListItem>
        <ActionListItem>Edit Comment</ActionListItem>
        <ActionListItem type="danger">Delete Comment</ActionListItem>
    </ActionList>
`}
/>

<CodeResult white>
  <ActionList>
    <ActionListItem>Show Details</ActionListItem>
    <ActionListItem>Edit Comment</ActionListItem>
    <ActionListItem type="danger">Delete Comment</ActionListItem>
  </ActionList>
</CodeResult>

<h3 id="selection">Single Selection</h3>

<p>
  For single selections, set <code>selection="single"</code> in the
  <code>{"<ActionList>"}</code>
  component. Then, use the <code>selected</code> property and the
  <code>on:select</code>
  events of the <code>{"<ActionListItem>"}</code> component to manage the selected
  item.
</p>

<CodeBlock
  code={`
    <ActionList selection="single">
        <ActionListItem 
            selected={current === 1}
            on:select={() => current = 1}
        >
            Option 1
        </ActionListItem>
        <ActionListItem 
            selected={current === 2}
            on:select={() => current = 2}
        >
            Option 2
        </ActionListItem>
        <ActionListItem 
            selected={current === 3}
            on:select={() => current = 3}
        >
            Option 3
        </ActionListItem>
    </ActionList>
`}
  language="svelte"
/>

<CodeResult white>
  <ActionList selection="single">
    <ActionListItem selected={x1 === 1} on:select={() => (x1 = 1)}>
      Option 1
    </ActionListItem>
    <ActionListItem selected={x1 === 2} on:select={() => (x1 = 2)}>
      Option 2
    </ActionListItem>
    <ActionListItem selected={x1 === 3} on:select={() => (x1 = 3)}>
      Option 3
    </ActionListItem>
  </ActionList>
</CodeResult>

<p>
  with <code>selectionAlign="end"</code>
</p>

<CodeResult white>
  <ActionList selection="single" selectionAlign="end">
    <ActionListItem selected={x11 === 1} on:select={() => (x11 = 1)}>
      Option 1
    </ActionListItem>
    <ActionListItem selected={x11 === 2} on:select={() => (x11 = 2)}>
      Option 2
    </ActionListItem>
    <ActionListItem selected={x11 === 3} on:select={() => (x11 = 3)}>
      Option 3
    </ActionListItem>
  </ActionList>
</CodeResult>

<h3 id="multi-selection">Multi Selection</h3>

<p>
  For multi selections, set <code>selection="multi"</code> in the
  <code>{"<ActionList>"}</code> component.
</p>

<CodeBlock
  code={`
    <ActionList selection="multi">
        {#each [1,2,3] as value}
            <ActionListItem 
                selected={x2.includes(value)}
                on:select={() => {
                    if (x2.includes(value)) {
                        x2 = x2.filter(x => x !== value);
                    } else {
                        x2 = [...x2, value];
                    }
                }}
            >
                Option {value}
            </ActionListItem>
        {/each}
    </ActionList>
`}
  language="svelte"
/>

<CodeResult white>
  <ActionList selection="multi">
    {#each [1, 2, 3] as value}
      <ActionListItem
        selected={x2.includes(value)}
        on:select={() => {
          if (x2.includes(value)) {
            x2 = x2.filter((x) => x !== value);
          } else {
            x2 = [...x2, value];
          }
        }}
      >
        Option {value}
      </ActionListItem>
    {/each}
  </ActionList>
</CodeResult>

<p>
  with <code>selectionAlign="end"</code>
</p>

<CodeResult white>
  <ActionList selection="multi" selectionAlign="end">
    {#each [1, 2, 3] as value}
      <ActionListItem
        selected={x22.includes(value)}
        on:select={() => {
          if (x22.includes(value)) {
            x22 = x22.filter((x) => x !== value);
          } else {
            x22 = [...x22, value];
          }
        }}
      >
        Option {value}
      </ActionListItem>
    {/each}
  </ActionList>
</CodeResult>

<h3 id="group">Group</h3>

<p>
  Use the <code>{"<ActionListGroup>"}</code> component to group items. You can also
  set a title and a divider for the group.
</p>

<CodeBlock
  code={`
    <ActionList>
        <ActionListGroup title="Comment">
            <ActionListItem>Delete</ActionListItem>
            <ActionListItem>Spam</ActionListItem>
        </ActionListGroup>
        <ActionListGroup title="User" divider>
            <ActionListItem>Ban User</ActionListItem>
        </ActionListGroup>
    </ActionList>
`}
  language="svelte"
/>

<CodeResult white>
  <ActionList>
    <ActionListGroup title="Comment">
      <ActionListItem>Edit</ActionListItem>
      <ActionListItem>Move</ActionListItem>
    </ActionListGroup>
    <ActionListGroup title="User" divider>
      <ActionListItem>Ban</ActionListItem>
    </ActionListGroup>
    <ActionListGroup divider>
      <ActionListItem type="danger">Delete</ActionListItem>
    </ActionListGroup>
  </ActionList>
</CodeResult>

<h3 id="group-selection">Group Selection</h3>

<p>
  You can also use the <code>selection</code> property in the
  <code>{"<ActionListGroup>"}</code> component to set the selection mode for only
  the items in the group.
</p>

<CodeBlock
  code={`
    <ActionList>
        <ActionListGroup title="Single" selection="single">
            <ActionListItem selected>Option 1</ActionListItem>
            <ActionListItem>Option 2</ActionListItem>
        </ActionListGroup>
        <ActionListGroup title="Multi" divider selection="multi">
            <ActionListItem>Option 3</ActionListItem>
            <ActionListItem>Option 4</ActionListItem>
        </ActionListGroup>
    </ActionList>
`}
  language="svelte"
/>

<CodeResult white>
  <ActionList>
    <ActionListGroup title="Single" selection="single">
      <ActionListItem selected={x3 === 1} on:select={() => (x3 = 1)}
        >Option 1</ActionListItem
      >
      <ActionListItem selected={x3 === 2} on:select={() => (x3 = 2)}
        >Option 2</ActionListItem
      >
    </ActionListGroup>

    <ActionListGroup title="Multi" divider selection="multi">
      {#each [1, 2] as value}
        <ActionListItem
          selected={x4.includes(value)}
          on:select={() => {
            if (x4.includes(value)) {
              x4 = x4.filter((x) => x !== value);
            } else {
              x4 = [...x4, value];
            }
          }}
        >
          Option {value}
        </ActionListItem>
      {/each}
    </ActionListGroup>
  </ActionList>
</CodeResult>

<h3 id="start-end-slots">Start and End Slots</h3>

<CodeBlock
  code={`
    <ActionList>
        <ActionListItem>
            <IconHandThumbsUp slot="start" />
            Vote
            <Text light slot="end">⌘⇧V</Text>
        </ActionListItem>
        <ActionListItem>
            <IconPencil slot="start" />
            Edit
            <Text light slot="end">⌘⇧E</Text>
        </ActionListItem>
        <ActionListItem type="danger">
            <IconTrash slot="start" />
            Delete
            <Text light slot="end">⌘⇧D</Text>
        </ActionListItem>
    </ActionList>
`}
/>

<CodeResult white>
  <ActionList>
    <ActionListItem>
      <IconHandThumbsUp slot="start" />
      Vote
      <Text light slot="end">⌘⇧V</Text>
    </ActionListItem>
    <ActionListItem>
      <IconPencil slot="start" />
      Edit
      <Text light slot="end">⌘⇧E</Text>
    </ActionListItem>
    <ActionListItem type="danger">
      <IconTrash slot="start" />
      Delete
      <Text light slot="end">⌘⇧D</Text>
    </ActionListItem>
  </ActionList>
</CodeResult>

<h3 id="descriptions">Descriptions</h3>

<CodeBlock
  code={`
    <ActionList>
        <ActionListItem>
            <IconHandThumbsUp slot="start" />
            Vote
            <div slot="description">Add a vote to this comment.</div>
            <Text light slot="end">⌘⇧V</Text>
        </ActionListItem>
        <ActionListItem>
            <IconPencil slot="start" />
            Edit
            <div slot="description">Edit this comment.</div>
            <Text light slot="end">⌘⇧E</Text>
        </ActionListItem>
        <ActionListItem type="danger">
            <IconTrash slot="start" />
            Delete
            <div slot="description">Delete this comment.</div>
            <Text light slot="end">⌘⇧D</Text>
        </ActionListItem>
    </ActionList>
`}
/>

<CodeResult white>
  <ActionList>
    <ActionListItem>
      <IconHandThumbsUp slot="start" />
      Vote
      <div slot="description">Add a vote to this comment.</div>
      <Text light slot="end">⌘⇧V</Text>
    </ActionListItem>
    <ActionListItem>
      <IconPencil slot="start" />
      Edit
      <div slot="description">Edit this comment.</div>
      <Text light slot="end">⌘⇧E</Text>
    </ActionListItem>
    <ActionListItem type="danger">
      <IconTrash slot="start" />
      Delete
      <div slot="description">Delete this comment.</div>
      <Text light slot="end">⌘⇧D</Text>
    </ActionListItem>
  </ActionList>
</CodeResult>

<h3 id="disabled">Disabled</h3>

<CodeBlock
  code={`
    <ActionList>
        <ActionListItem disabled>
            <IconHandThumbsUp slot="start" />
            Vote
            <div slot="description">Add a vote to this comment.</div>
            <Text light slot="end">⌘⇧V</Text>
        </ActionListItem>
        <ActionListItem disabled>
            <IconPencil slot="start" />
            Edit
            <div slot="description">Edit this comment.</div>
            <Text light slot="end">⌘⇧E</Text>
        </ActionListItem>
    </ActionList>
`}
/>

<CodeResult white>
  <ActionList>
    <ActionListItem disabled>
      <IconHandThumbsUp slot="start" />
      Vote
      <div slot="description">Add a vote to this comment.</div>
      <Text light slot="end">⌘⇧V</Text>
    </ActionListItem>

    <ActionListItem disabled>
      <IconPencil slot="start" />
      Edit
      <div slot="description">Edit this comment.</div>
      <Text light slot="end">⌘⇧E</Text>
    </ActionListItem>
  </ActionList>
</CodeResult>
