<template>
    <v-app>
        <v-app-bar color="primary">
            <v-app-bar-nav-icon @click.stop="drawer=!drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Home</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-cog</v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer
          v-model="drawer"
          location="left"
          temporary>
            <v-list>
                <v-list-item to="/official">Official</v-list-item>
                <v-list-item to="/potato">Sweet Potato</v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <v-container style="height:100%">
                <v-row align-content="center" style="height:100%">
                    <v-col cols="12" justify="center" style="padding:40px"><v-row justify="center"><v-btn size="x-large" to="/official">Official</v-btn></v-row></v-col>
                    <v-col cols="12" justify="center" style="padding:40px"><v-row justify="center"><v-btn size="x-large" to="/potato">Sweet Potato</v-btn></v-row></v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts">
export default{
    data:()=>({
        drawer:false,
        group:null,

    }),
    watch:{
        group(){
            this.drawer=false
        }
    }
}
</script>
