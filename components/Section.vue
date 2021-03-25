<template>
  <div class="section">
    <div class="section__container">
      <h2 class="section__title">
        {{ title }}
        <slot name="title-extension"></slot>
      </h2>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Untitled',
    },
  },
};
</script>

<style>
.section {
  padding: 32px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid lightgrey;
}

.section:last-child {
  border: none;
}

.section__container {
  width: 60%;
}

.section__title {
  margin-bottom: 16px;
  font-size: 28px;
  font-weight: normal;
}
</style>
