<template>
    <div class="modal d-block" @click="onCloseModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="onCloseModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>{{ body }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" @click.prevent="onNoClick" class="btn btn-secondary" data-dismiss="modal">{{ noButton }}</button>
                    <button type="button" @click.prevent="onYesClick" class="btn btn-primary">{{ yesButton }}</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    emits: [
        'onNoClick',
        'onYesClick',
        'onCloseModal',
    ],

    props: {
        pTitle: { type: String },
        pBody: { type: String },
        pYesButton: { type: String },
        pNoButton: { type: String },
    },

    computed: {
        title() {
            return this.pTitle
        },
        body() {
            return this.pBody
        },
        yesButton() {
            return this.pYesButton
        },
        noButton() {
            return this.pNoButton
        },
    },

    methods: {
        onNoClick() {
            this.$emit('onNoClick')
        },

        onYesClick() {
            this.$emit('onYesClick')
        },

        onCloseModal() {
            this.$emit('onCloseModal')
        }
    }
}
</script>


<!-- <style lang="">
    
</style> -->