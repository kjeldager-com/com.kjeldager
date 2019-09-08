
import Vue, { VNode } from 'vue';

import * as tsx from "vue-tsx-support";
import { Component, Prop, Watch } from 'vue-property-decorator';



import "@/assets/less/components/sections.less";
//import "@/assets/less/components/btn.less";


export interface FrontPageOptions {

}



export interface WDynItemOptions {
    number: string;
    title: string;
    video?: string;

}

@Component
export class WDynItem extends tsx.Component<WDynItemOptions, {}, { info }> {



    @Prop({ default: "01" })
    number!: string;

    @Prop()
    title!: string;

    @Prop()
    video!: string;

    top = "-60%";

    mounted() {
        console.log("MOUNTED");

        if (this.video) {

            let videoElement = document.querySelector("#myVideo") as HTMLVideoElement;

            let e = videoElement.parentElement as HTMLDivElement;
            document.addEventListener("scroll", (event) => {
                console.log("scrolling");
                let bb = e.getBoundingClientRect();
                try {
                    if (!videoElement.currentTime) {
                        //     videoElement.currentTime = (500 - bb.top) / 100
                        //  videoElement.currentTime = 
                        videoElement.play();
                    }
                } catch (err) {
                    console.log(err);
                }

                // console.log(bb.top);
                this.top = `calc(50% - ${bb.top}px)`
                // videoElement.style.top = `calc(-100% + ${Math.abs(bb.top)}px)`
                //  console.log(videoElement.style.top);
                //  console.log(this.top);
                //   console.log(this.$data);
            });
        }
        console.log("mounted");
        if (process.client) {
            console.log(this);
            console.log("mounted");
              
            setTimeout(async () => {
                await import('waypoints/lib/noframework.waypoints.js');
                var waypoint = new Waypoint({
                    element: this.$el, // document.getElementById(this.uniqId),

                    handler: (direction) => {
                        
                        console.log(direction);
                        console.log("a");
                    }
                })
            });
        }
    }
    render() {
        //  console.log(this.$data.top);
        //   console.log(this.video)

        let video: JSX.Element | null = null;
        if (this.video) {

            video = (
                <video muted={true} id="myVideo" style={{ top: this.top }} >
                    <source src={this.video} type="video/mp4" />
                </video>
            );
        }

        return (
            <div class={{ 'wrapper': true, 'w-dyn-item': true, 'with-video-background': this.video }}>

                {video}

                <div class="column vh50">
                    <div class="column _100vh">
                        <div class="project-info">
                            <div class="number">
                                <h2 class="number zero">{this.number}</h2>
                            </div>
                            <h2 class="project-title">{this.title}</h2>

                            {this.$scopedSlots.info(this)}


                        </div>
                    </div>
                    <div class="column _100vh">
                        <div class="project-description">
                            {this.$slots.default}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

@Component(
    {
        layout: "DefaultLayout"
    })
export default class FrontPage extends tsx.Component<FrontPageOptions>{


    mounted() {
        console.log("Mounted FrontPage");
        if (process.client) {
            window.document.body.classList.add("mounted");
        }
    }



    render() {

        return (
            <div class="section main">
                <div class="w-dyn-list">
                    <div class="w-dyn-items">
                        <WDynItem title="Holding Company" number="01"  >
                            <template slot="info">
                                Company Stucture
                            </template>
                            <p class="reader">
                              The following company is the holding company of EarthML.com, IO-Board.com and DotNetDevOps.org. Kjeldager Holding is 100% owned by Poul Kjeldager Sørensen, https://pksorensen.com  
                            </p>
                        </WDynItem>
                        <WDynItem title="EarthML" number="02"  >
                            <template slot="info">
                               https://EarthML.com
                            </template>
                            <p class="reader">
                                EarthML is working with GIS and Earth Observation. Providing tiling services, data abstraction layers for ESA Sentinel Satellites data and mapping services for clients.
                            </p>
                        </WDynItem>
                        <WDynItem title="IO-Board" number="03"  >
                            <template slot="info">
                                https://io-board.com
                            </template>
                            <p class="reader">
                               IO-Board is a horizontal data platform for easy data registration with solutions for data analtics, insight and dashboarding
                            </p>
                        </WDynItem>
                        <WDynItem title="DotNetDevOps" number="04"  >
                            <template slot="info">
                                https://dotnetdevops.ors
                            </template>
                            <p class="reader">
                               DotNetDevOps is a collection of resources and tooling to beliver software in a modern world.
                            </p>
                        </WDynItem>

                         
                    </div>
                </div>

            </div>
        );
    }
}
