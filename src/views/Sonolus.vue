<template>
    <v-app>
        <v-app-bar color="primary">
            <v-app-bar-nav-icon @click.stop="drawer=!drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Sonolus</v-toolbar-title>
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
                <v-list-item to="/">Home</v-list-item>
                <v-list-item to="/official">Official</v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <v-container>
                <v-row>
                    <v-col 
                    v-for="n in 24"
                    :key="n"
                    cols="4">
                        <v-card height="200"></v-card>
                    </v-col>
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
