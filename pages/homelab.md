---
layout: default
title: "Homelab"
metadescription: "Information about my homelab and its purpose"
image: "homelab.jpg"
permalink: "/lab/"
---

I maintain a comprehensively documented 'homelab' which I use to to learn networking & administration fundamentals, and experiment with new technologies & applications, in an environment where it doesn't matter so much if things aren't perfect. It consists of both enterprise-grade industry-standard equipment, as well as repurposed consumer devices.

Primarily, the goal is to learn and get hands-on experience with things, for both fun and professional development.  
Nothing on this page is an exhaustive list, and things are always changing.

## Software & Services
I host a small selection of containerized services and applications for friends, family, and my own personal use. Examples include Plex and GitLab for media and code hosting, respectively. In the past, I hosted Minecraft servers and provided managed wikis for various communities.

Other applications, such as Ubiquiti's UniFi Controller, or AdGuardHome, provide services for the rest of the network.

A TrueNAS VM provides terabytes of storage for my media, archives, projects, and more.

## Hardware
My primary server is a ThinkCentre M93p, with an i7 4770 and 20GB of RAM. This is where most everything runs, using Proxmox as a hypervisor.  
I also have a testing server---a ThinkCentre E73---which I use for ephemeral services and operating system experimentation. For example, I recently used it to try VMware ESXi and pfSense.  
Routing and switching is handled by an EdgeRouter X and an EdgeSwitch 24 Lite, with a UAP U6 Lite providing WiFi. 

A Synology DS218 acts as an NVR, and as a backup target for Proxmox.

In addition to the above, I have a small collection of equipment from various vendors, including HP Enterprise and MikroTik. My University provides me with access to an array of Cisco devices, and I have a few Raspberry Pis lying around too.

## Further Reading
You can find more info about my setup within [my knowledgebase on Notion](https://wiki.tomr.me/lab); I am quite proud of how organised I have everything here, though sometimes I forget to update things.

If you would like to learn more about being your own sysadmin, the [r/homelab subreddit](https://reddit.com/r/homelab) has some [excellent resources](https://www.reddit.com/r/homelab/wiki/introduction).  
Have fun, and please get in touch if you have any questions :)