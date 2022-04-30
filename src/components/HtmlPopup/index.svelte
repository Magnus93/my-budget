<script lang="ts">
  import { toStyle } from "../../model";
  let detailElement: HTMLDetailsElement;
  let summaryElement: HTMLElement;
  let contentElement: HTMLDivElement;
  let cssVariables: { "--left"?: string };
  $: {
    cssVariables = setDetailEvents(detailElement);
  }
  function setDetailEvents(element) {
    console.log(element);
    if (element instanceof HTMLDetailsElement) {
      element.addEventListener("toggle", () => {
        const box = contentElement.getBoundingClientRect();
        if (box.right != 0 && box.left != 0) {
          const parent = summaryElement.getBoundingClientRect();
          if (parent.left+(parent.width+box.width)/2 > window.innerWidth) // Too far right
            cssVariables = { "--left": `calc(${(window.innerWidth-(parent.left+box.width)).toFixed(0)}px - 1rem)`}
          else if (parent.left-(parent.width+box.width)/2 < 0) // Too far left
            cssVariables = { "--left": `calc(${(-parent.left).toFixed(0)}px + 1rem)`}
          else // Centered
            cssVariables = {"--left": `${((parent.width - box.width) / 2).toFixed(0)}px`};
        }
      });
      return cssVariables;
    }
  }
  // function handleDetailClickEvent(e) {
  //   console.log(e.target)
  //   const boundingBox = contentElement.getBoundingClientRect()
  //   console.log(boundingBox)
  //   console.log(boundingBox.right, window.innerWidth)
  //   startFrom = boundingBox.right >= window.innerWidth ? "right" : "left"
  // }
</script>

<details bind:this={detailElement} style={toStyle(cssVariables)}>
  <summary bind:this={summaryElement}><slot name="button">⋮</slot></summary>
  <div class="background" on:click={() => (detailElement.open = false)} />
  <div class="popup-container">
    <div
      class="popup"
      bind:this={contentElement}
    >
      <slot name="content">Popup-Slot</slot>
    </div>
  </div>
</details>

<style lang="scss">
  details {
    --top: 1rem;
    .background {
      background-color: transparent;
      inset: 0;
      position: fixed;
    }
    & > summary {
      cursor: pointer;
      padding: 0.5rem 1rem;
      font-weight: bold;
      border-radius: 0.5rem;
      z-index: 1;
      position: relative;
      &::marker {
        content: "";
      }
    }
  }
  .popup-container {
    position: relative;
    &::before,
    &:after {
      position: absolute;
      border: var(--top) solid transparent;
      height: 0;
      width: 0;
      left: calc(var(--top) - 2px);
    }
    &::before {
      content: "";
      border-bottom-color: RGB(var(--tint-color));
      bottom: calc(-1 * var(--top));
    }
    &::after {
      content: "";
      border-bottom-color: RGB(var(--shade-color));
      bottom: calc(-1 * var(--top) - 2px);
    }
    & > .popup {
      position: absolute;
      top: var(--top);
      border: 1px solid RGB(var(--tint-color));
      background-color: RGB(var(--shade-color));
      left: var(--left);
    }
  }
  details[open] > summary,
  summary:hover {
    background-color: RGB(var(--hover-color));
  }
</style>
