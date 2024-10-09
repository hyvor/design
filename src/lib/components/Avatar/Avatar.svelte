<script lang="ts">
  export let size: number | "small" | "medium" | "large" = "medium";
  export let alt = "";

  const sizes = {
    small: 24,
    medium: 32,
    large: 48,
  };
  size = typeof size === "number" ? size : sizes[size];
</script>

<img {alt} {...$$restProps} style={`width: ${size}px; height: ${size}px;`} />

<style>
  img {
    border-radius: 50%;
    display: inline-block;
    overflow: hidden;
  }
</style>
