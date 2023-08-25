<template>
    <h1>Oops!</h1>
    <h3>The {{ resource }} you're looking for is not here.</h3>
    <router-link :to="{ name: 'EventList' }">Back to the home page</router-link>
</template>

<script>
    export default {
        props: {
            type: String,
            // eslint-disable-next-line vue/require-prop-type-constructor
            required: true,
            // eslint-disable-next-line vue/require-prop-type-constructor
            default: 'page'
        }
    }
</script>