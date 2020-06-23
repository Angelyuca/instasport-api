<template>
    <div>
        <div class="city">
            <v-btn @click="clearCity" icon color="green" class="refresh-city">
                <v-icon>mdi-cached</v-icon>
            </v-btn>

            <v-chip-group
                    column
                    active-class="primary--text"
                    v-model="activeCityNumber"

            >
                <v-chip class="ma-1"
                        @click="filterCity(city.slug)" v-for="city in cities">
                    {{ city.title }}
                </v-chip>
            </v-chip-group>
        </div>
        <div class="activity">
            <v-btn @click="clearAct" icon color="green" class="refresh-activity">
                <v-icon>mdi-cached</v-icon>
            </v-btn>
            <v-chip-group
                    column
                    active-class="primary--text"
                    v-model="activeActivityNumber"

            >
                <v-chip class="ma-1"
                        outlined
                        label
                        @click="filterActivity(activity.slug)"
                        v-for="activity in activities"
                >
                    {{ activity.title }}
                </v-chip>
            </v-chip-group>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MainFilter",
        data: () => {
            return {
                activeCityNumber: null,
                activeActivityNumber: null,
            }
        },
        methods: {
            filterCity(slug) {
                this.$store.dispatch('actionFilterCity', slug);
            },
            filterActivity(slug) {
                this.$store.dispatch('actionFilterActivity', slug)
            },
            clearCity() {
                this.$store.dispatch('actionFilterCity', '');
                this.activeCityNumber = -1
            },
            clearAct() {
                this.$store.dispatch('actionFilterActivity', '');
                this.activeActivityNumber = -1
            }
        },
        computed: {
            cities() {
                let clubs = this.$store.getters.getStoreClubs;
                let cities = [];
                for (let club of clubs) {
                    cities.push(club.city)
                }
                let arr_title = [];
                let result = [];
                cities.forEach(city => {
                    if (!arr_title.includes(city.title)) {
                        arr_title.push(city.title);
                        result.push(city);
                    }
                });
                return result;
            },
            activities() {
                let city = this.$store.getters.getStoreCity;
                let clubs = this.$store.getters.getStoreClubs;
                if (city !== "") {
                    let arr = clubs.filter(club => club.city.slug === city);
                    let activities = [];
                    for (let club of arr) {
                        for (let obj_activity of club.activity) {
                            activities.push(obj_activity)
                        }
                    }
                    let arr_title = [];
                    let result = [];
                    activities.forEach(activity => {
                        if (!arr_title.includes(activity.title)) {
                            arr_title.push(activity.title);
                            result.push(activity);
                        }
                    });
                    return result;

                } else {
                    let activities = [];
                    for (let club of clubs) {
                        for (let obj_activity of club.activity) {
                            activities.push(obj_activity)
                        }
                    }
                    let arr_title = [];
                    let result = [];
                    activities.forEach(activity => {
                        if (!arr_title.includes(activity.title)) {
                            arr_title.push(activity.title);
                            result.push(activity);
                        }
                    });
                    return result;
                }
            }
        }
    }
</script>

<style lang="scss">
    .activity {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
        border-top: 1px solid #adadad;
    }

    .city {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
    }

    .v-chip-group--column .v-slide-group__content {
        justify-content: center;
    }

    .refresh-city, .refresh-activity {
        position: absolute;
        left: 0;
    }

    .city, .activity {
        padding: 5px 30px;
    }

</style>