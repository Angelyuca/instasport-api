<template>
    <div>
        <section>
            <div class="my-col" v-for="item in items">
                <v-img
                        :src="item.logo"
                        class="white--text align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        @click="open(item.link)"
                >
                    <v-card-title v-text="item.title"></v-card-title>
                </v-img>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "MainContent",
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

                if(city.length > 0 && activity.length >0){
                    return  clubs.filter(function (club) {
                        for (let activities of club.activity) {
                            return ((activities.slug === activity) && (club.city.slug === city));
                        }

                    })
                }

                else if (city.length > 0) {
                    return  clubs.filter(function (club) {
                        return club.city.slug === city;
                    })
                }
                else if (activity.length >0){
                    return  clubs.filter(function (club) {
                        for (let activities of club.activity) {
                            return activities.slug === activity;
                        }
                    })}
                else return clubs

            }

        }

    }
</script>

<style lang="scss" scoped>

    section {
        /*padding: 20px;*/
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 220px));

        .my-col {
            padding: 15px;
        }

        .v-image {
            border-radius: 5px;
            box-shadow: 0px 9px 32px -18px rgba(0, 0, 0, 0.75);
        }

        .v-image:hover {
            cursor: pointer;
            box-shadow: 0 0 10px rgba(68, 108, 255, 0.58);
        }
    }

</style>