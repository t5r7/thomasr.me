---
layout: default
title: Homelab
image: "lab.jpg"
permalink: /lab/
---

I maintain and "babysit" a homelab, to play with various bits of software, services, and hardware. It's always a work-in-progress, but I keep things nicely organised and documented in a private wiki. Here's a brief overview of what I have set up, as of November 2024:

Across two sites—my university flat, and my parents' house—there lies a menagerie of devices. For a VPN solution, I am currently using Tailscale for the sake of simplicity, though in the past I have experimented with both OpenVPN and WireGuard.

On a ThinkCentre Tiny, I run Proxmox to manage containers and VMs. This runs a broad range of services, from a web server to media and monitoring. An attached software defined radio is used for tracking aeroplanes with ADS-B, and interrogating the airwaves with SDR#.
One of the most useful things I've used this box for is quickly setting up and tearing down virtual networks and environments. For example, I have a collection of virtual machines used to test Active Directory across various versions of Windows and Linux.

A Raspberry Pi runs AdGuardHome for network-wide ad-blocking. This has been configured to support both plain DNS and DNS-over-HTTPS.

As a NAS, I run TrueNAS on a SFF ThinkCentre. This has an SFP+ card with a 10Gbps-capable transceiver, but is currently connected to my laptop via a 2.5GBps adapter. It's all-SSD, so it can survive being moved around in the boot of a car.

Infrastructure-wise, I currently employ Ubiquiti (mainly their ISP-oriented Edge series) and MikroTik. I enjoy using equipment from a wide range of vendors and trying out their solutions, so I don't stick to one brand. My lab is Cisco-free, since I have ample access to vast amounts of Cisco equipment at university.

For remote backups, I run a Synology at my parents' house. This is also used as an NVR. 

---


I've deliberately kept this vague, so as not to make this page an essay, but if you're interested in the finer details, or have a suggestion or comment, please do [get in touch](/contact/)!
