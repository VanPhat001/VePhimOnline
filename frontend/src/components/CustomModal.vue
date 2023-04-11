<template>
    <div class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ pTitle }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>{{ pBody }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" @click.prevent="onNoClick" class="btn btn-secondary" data-dismiss="modal">{{ pNoButton }}</button>
                    <button type="button" @click.prevent="onYesClick" class="btn btn-primary">{{ pYesButton }}</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    emits: [
        'onNoClick',
        'onYesClick'
    ],

    props: {
        pTitle: { type: String },
        pBody: { type: String },
        pYesButton: { type: String },
        pNoButton: { type: String },
    },

    methods: {
        onNoClick() {
            this.$emit('onNoClick');
        },

        onYesClick() {
            this.$emit('onYesClick');
        }
    }
}
</script>


<!-- <style lang="">
    
</style> -->