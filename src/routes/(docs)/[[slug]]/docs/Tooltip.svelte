<script lang="ts">
  import Tooltip from "$lib/components/Tooltip/Tooltip.svelte";
  import Button from "$lib/components/Button/Button.svelte";
  import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte";
  import Table from "$lib/components/Table/Table.svelte";
  import TableRow from "$lib/components/Table/TableRow.svelte";
  import Callout from "$lib/components/Callout/Callout.svelte";
  import CodeResult from "./Helper/CodeResult.svelte";
</script>

<h1>Tooltip</h1>

<p>
  Tooltips are small textual hints displayed when a user hovers over a UI
  element.
</p>

<h2 id="props">Properties</h2>

<Table columns="2fr 2fr 3fr">
  <TableRow head>
    <div>Name</div>
    <div>Default</div>
    <div>Description</div>
  </TableRow>

  <TableRow>
    <div><code>text</code></div>
    <div></div>
    <div>The text to display in the tooltip.</div>
  </TableRow>

  <TableRow>
    <div><code>position</code></div>
    <div>top</div>
    <div>
      One of the following:

      <ul>
        <li><code>top</code></li>
        <li><code>bottom</code></li>
        <li><code>left</code></li>
        <li><code>right</code></li>
      </ul>
    </div>
  </TableRow>

  <TableRow>
    <div><code>color</code></div>
    <div>black</div>
    <div>
      One of the following:

      <ul>
        <li><code>black</code></li>
        <li><code>accent</code></li>
        <li><code>soft</code></li>
        <li><code>danger</code></li>
      </ul>
    </div>
  </TableRow>

  <TableRow>
    <div><code>maxWidth</code></div>
    <div>300</div>
    <div>The max width of the tooltip in pixels.</div>
  </TableRow>
</Table>

<h2 id="slots">Slots</h2>

<Table columns="1fr 3fr">
  <TableRow head>
    <div>Name</div>
    <div>Description</div>
  </TableRow>
  <TableRow>
    <div><code>default</code></div>
    <div>The content that triggers the tooltip when hovered over.</div>
  </TableRow>
  <TableRow>
    <div><code>tooltip</code></div>
    <div>
      The content of the tooltip. This can be used instead of the <code
        >text</code
      > prop.
    </div>
  </TableRow>
</Table>

<h2 id="examples">Examples</h2>

<h3 id="usage">Basic Usage</h3>

<CodeBlock
  code={`
    <Tooltip text="This is a tooltip">
        <Button>Hover me</Button>
    </Tooltip>
`}
/>

<CodeResult>
  <Tooltip text="This is a tooltip">
    <Button>Hover me</Button>
  </Tooltip>
</CodeResult>

<h3 id="positions">Positions</h3>

<CodeBlock
  code={`
    <Tooltip position="top" />
    <Tooltip position="left" />
    <Tooltip position="right" />
    <Tooltip position="bottom" />
`}
/>

<CodeResult>
  <div class="position-wrap">
    <div class="top">
      <Tooltip text="Top tooltip"><Button color="gray">Top</Button></Tooltip>
    </div>

    <div class="horizontal">
      <Tooltip text="Left tooltip" position="left"
        ><Button color="gray">Left</Button></Tooltip
      >
      <Tooltip text="Right tooltip" position="right"
        ><Button color="gray">Right</Button></Tooltip
      >
    </div>

    <div class="bottom">
      <Tooltip text="Bottom tooltip" position="bottom"
        ><Button color="gray">Bottom</Button></Tooltip
      >
    </div>
  </div>
</CodeResult>

<h3 id="colors">Colors</h3>

<CodeBlock
  code={`
    <Tooltip color="soft" />
    <Tooltip color="black" />
    <Tooltip color="accent" />
    <Tooltip color="danger" />
`}
/>

<CodeResult>
  <div class="colors-wrap">
    <Tooltip text="Soft tooltip" color="soft"
      ><Button color="gray">Soft</Button></Tooltip
    >
    <Tooltip text="Black tooltip" color="black"
      ><Button color="gray">Black</Button></Tooltip
    >
    <Tooltip text="Accent tooltip" color="accent"
      ><Button color="gray">Accent</Button></Tooltip
    >
    <Tooltip text="Danger tooltip" color="danger"
      ><Button color="gray">Danger</Button></Tooltip
    >
  </div>
</CodeResult>

<h3 id="slot">with Slot</h3>

<p>
  You can use the <code>tooltip</code> slot to add advanced content to the tooltip.
</p>

<CodeBlock
  code={`
    <Tooltip>
        <Button>Hover me</Button>
        <div slot="tooltip">
            <div>This is a tooltip</div>
            <Callout type="info">It can contain any content</Callout>
        </div>
    </Tooltip>
`}
/>

<CodeResult>
  <Tooltip>
    <Button>Hover me</Button>
    <div slot="tooltip">
      <div>This is a tooltip</div>
      <Callout type="info">It can contain any content</Callout>
    </div>
  </Tooltip>
</CodeResult>

<h3 id="long">Long Text</h3>

<p>
  By default, the maximum width of the tooltip is set to <code>300px</code>. If
  the text is longer than this, it will wrap to the next line. You can change
  this value by setting the <code>maxWidth</code> prop.
</p>

<CodeBlock
  code={`
    <Tooltip 
        text="This is a very long text with a lot of characters and words. Let's see how this is displayed in a tooltip" 
        maxWidth={200}
    >
        <Button>Hover me</Button>
    </Tooltip>
`}
/>

<CodeResult>
  <Tooltip
    text="This is a very long text with a lot of characters and words. Let's see how this is displayed in a tooltip"
    maxWidth={200}
  >
    <Button>Hover me</Button>
  </Tooltip>
</CodeResult>

<h3 id="disabled">Disabled</h3>

<p>
  You can disable the tooltip by setting the <code>disabled</code> prop.
</p>

<CodeBlock
  code={`
    <Tooltip disabled text="Disabled Tooltip">
        <Button>Hover me</Button>
    </Tooltip>
`}
/>

<CodeResult>
  <Tooltip disabled text="Disabled Tooltip">
    <Button>Hover me</Button>
  </Tooltip>
</CodeResult>

<style>
  .position-wrap {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .top,
  .bottom,
  .horizontal {
    text-align: center;
  }
  .horizontal {
    display: flex;
    justify-content: space-around;
  }
  .colors-wrap {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: flex-start;
  }
</style>
