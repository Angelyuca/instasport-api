<template>
    <div>
        <transition-group name="list" tag="div" class="vasya">

            <div v-if="show" class="my-col list-item" v-for="(item, index) in items" :key="index">
                <v-img
                        :src="item.logo"
                        class="white--text align-end image-custom"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        @click="open(item.link)"
                >
                    <v-card-title class="text-custom" v-text="item.title"></v-card-title>
                </v-img>
            </div>
        </transition-group>
    </div>
</template>

<script>
    export default {
        name: "MainContent",
        data: () => ({
            show: true
        }),
        methods: {
            open(url) {
                window.open(url);
            }
        },
        computed: {
            items() {
                let clubs = this.$store.getters.getStoreClubs;
                let city = this.$store.getters.getStoreCity;
                let activity = this.$store.getters.getStoreActivity;


                this.show = false;
                setTimeout(() => this.show = true, 1);

                if (city.length > 0 && activity.length > 0) {
                    return clubs.filter(function (club) {
                        for (let item of club.activity) {
                            if(item.slug === activity)  return ((item.slug === activity) && (club.city.slug === city));
                        }
                    })
                } else if (city.length > 0) {
                    return clubs.filter(function (club) {
                        return club.city.slug === city;
                    })
                } else if (activity.length > 0) {
                    return clubs.filter(function (club) {
                        for (let item of club.activity) {
                            if(item.slug === activity) return item.slug === activity
                        }

                    })
                } else return clubs

            }

        }

    }
</script>

<style lang="scss" scoped>


    .list-item {
        display: inline-block;

    }

    .list-enter-active {
        transition: all 500ms;
    }

    .list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */
    {
        opacity: 0;
        transform: translateY(30px);
    }

    /*.vasya {*/
    /*    display: flex;*/
    /*    align-items: center;*/
    /*    justify-content: space-evenly;*/
    /*    flex-wrap: wrap;*/
    /*    padding: 25px;*/
    /*    margin: -5px;*/
    /*}*/
    /*.vasya:after {*/
    /*    content: '';*/
    /*    flex: auto;*/
    /*}*/
    /**/
    /*.my-col {*/
    /*    height: 200px;*/
    /*    width: 200px;*/
    /*    padding: 15px;*/
    /*}*/

    .vasya {
        display: flex;
        display: -webkit-flex;
        display: -moz-flex;
        flex-flow: row wrap;
        -webkit-flex-flow: row wrap;
    }

    .vasya .my-col {
        width: 23%;
        max-height: 250px;
        min-height: 50px;
        margin: 0 1% 10px;
    }

    .v-image {
        border-radius: 5px;
        box-shadow: 0px 9px 32px -18px rgba(0, 0, 0, 0.75);
    }

    .v-image:hover {
        cursor: pointer;
        box-shadow: 0 0 10px rgba(68, 108, 255, 0.58);
    }

    .image-custom {
        height: 100%;
        width: 100%;
    }

    .text-custom {
        line-height: 1.2;
        font-size: 2.7vmin;
        padding: 2vw;
    }

</style>