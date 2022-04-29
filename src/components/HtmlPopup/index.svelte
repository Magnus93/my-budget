<script lang="ts">
  let detailElement: HTMLDetailsElement
  let contentElement: HTMLDivElement
  let startFrom: "left" | "right"
  $: {
    setDetailEvents(detailElement)
  }
  function setDetailEvents(element) {
    console.log(element)
    if(element instanceof HTMLDetailsElement){
      element.addEventListener("toggle", () => {
        const boundingBox = contentElement.getBoundingClientRect()
        console.log(boundingBox.right, window.innerWidth)
        startFrom = boundingBox.right >= window.innerWidth ? "right" : "left"
      })
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

<details bind:this={detailElement}>
  <summary><slot name="button">⋮</slot></summary>
  <div class="background" on:click={() => detailElement.open = false}></div>
  <div class="popup-container" >
    <div class="popup" bind:this={contentElement} start-from={startFrom ?? "left"}>
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
    &::before, &:after {
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
      &[start-from="right"] {
        right: 0;
      }
    }
  }
  details[open] > summary, summary:hover {
    background-color: RGB(var(--hover-color));
  }
</style>
