<template>
    <v-app>
        <v-app-bar color="primary">
            <v-app-bar-nav-icon @click.stop="drawer=!drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Official</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
                <v-dialog
                    v-model="dialog"
                    activator="parent"
                    width="80%"
                >
                    <v-card class="px-8 pt-8">
                    <v-text-field label="名前">
                    </v-text-field>
                    <v-card-actions>
                        <v-btn color="primary" block @click="Search()">検索</v-btn>
                    </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-btn>
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
                <v-list-item to="/potato">Sweet Potato</v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <v-container>
                <v-pagination
                  v-model="page"
                  :length="length"
                  @update:model-value="getPageNumber">
                </v-pagination>
                <v-row>
                    <v-col 
                    v-for="item in items"
                    :key="item.name"
                    cols="12" style="padding:2px">
                        <v-card color="rgb(102,96,123)" height="100" @click="Game(item)">
                            <v-row style="height:100%;margin:0;padding:-10px">
                                <v-col cols="1"><v-avatar size="x-large" color="rgb(68,68,99)"><p style="color:rgb(0,204,187)" class="text-h4">{{ item.rating }}</p></v-avatar></v-col>
                                <v-col cols="1"><v-img aspect-ratio="1/1" width="100" :src="item.cover.url"></v-img></v-col>
                                <v-col cols="10">
                                    <v-row><p class="text-h5" style="height:50px;color:white;padding:10px 0;">{{ item.title }}</p></v-row>
                                    <v-row><p class="text-h6" style="height:30px;color:white;">{{ item.artists }}</p></v-row>
                                    <v-row><p class="text-5" style="height:5px;color:white;">{{ item.name }}</p></v-row>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
                <v-pagination
                  v-model="page"
                  :length="length"
                  @update:model-value="getPageNumber">
                </v-pagination>
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts">
// @ts-nocheck
import axios from "axios"
import { useAppStore } from "@/store/app"
const store=useAppStore()
function convertProxyURL(url:string){
    const proxyURL="https://cors-anywhere-taisei-dev.vercel.app/"
    return url.includes('https://')?url.replace("https://",proxyURL):proxyURL+"servers.sonolus.com/pjsekai"+url
}
export default{
    data:()=>({
        drawer:false,
        dialog:false,
        group:null,
        page:1,
        length:1,
        items:Array<any>(0)
    }),
    watch:{
        group(){
            //@ts-ignore
            this.drawer=false
        }
    },
    methods:{
        getPageNumber(num:number){
            axios.get(convertProxyURL('/sonolus/levels/list?page='+this.page))
            .then(res=>{
                this.length=res.data.pageCount-1
                //console.log(res.data.items)
                this.items=res.data.items
            })
        },
        Search(){
            this.dialog=false
        },
        Game(item:any) {
            store.setLoadConfig(
                {
                    mapContentSrc: convertProxyURL(item.data.url),
                    musicSrc: convertProxyURL(item.bgm.url),
                    coverSrc: convertProxyURL(item.cover.url),
                    songName: item.title
                }
            )
            console.log(JSON.stringify({
                    mapContentSrc: convertProxyURL(item.data.url),
                    musicSrc: convertProxyURL(item.bgm.url),
                    coverSrc: convertProxyURL(item.cover.url),
                    songName: item.title
                }))
            this.$router.push('/game')
        }
    },
    mounted(){
        axios.get(convertProxyURL('/sonolus/levels/list'))
        .then(res=>{
            this.length=res.data.pageCount-1
            //console.log(res.data.items)
            this.items=res.data.items
        })
    }
}
</script>
