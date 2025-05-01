---
layout: default
title: Homelab
permalink: /lab/
---

I maintain and "babysit" a homelab to play with various bits of software, services, and hardware. It's always a work in progress, but I (try to) keep things nicely organised and documented in a private wiki. Here's a brief—yet somehow still quite rambly—overview of what I have set up as of May 2025:

Across two sites—my university flat and my parents’ house—there lies a menagerie of devices. For a VPN solution, I am currently using Tailscale for the sake of simplicity, though in the past I have experimented with both OpenVPN and plain WireGuard.

On a ThinkCentre Tiny, I run Proxmox to manage containers and VMs. This hosts a broad range of services, including web servers, media hosting, and monitoring. An attached software-defined radio is used for tracking aeroplanes with ADS-B and interrogating the airwaves with SDR#. One of the most useful things I’ve used this box for is quickly setting up and tearing down virtual networks and environments. For example, I have a collection of virtual machines used to test Active Directory across various versions of Windows and Linux, which access the internet through a virtualised pfSense firewall.

A Raspberry Pi runs AdGuard Home for network-wide ad-blocking. This has been configured to support both plain DNS and DNS-over-HTTPS.

As a NAS, I run TrueNAS on a SFF ThinkCentre. This has an SFP+ card, so I can make the most of the all-SSD storage.

Infrastructure-wise, I currently employ MikroTik, Juniper, Ruckus, Netgear, and Ubiquiti (mostly their ISP-oriented Edge series) for networking. I enjoy using equipment from a wide range of vendors and trying out their solutions, so I try not to stick to one brand. My lab is Cisco-free (for now?), since I have ample access to vast amounts of Cisco equipment at university.

For remote backups, I run a Synology at my parents’ house. This is also used as an NVR. Their network has a small thin client running AdGuard Home and the UniFi controller for an access point.

I'm not sure if it can be counted as part of the "homelab," but you're accessing this website through a Hetzner VPS; it runs on ARM, which brings me great joy.

---

Things are always changing, and I'm always looking to improve things or tinker with something new. If you're interested in any specifics about anything mentioned, please do get in touch!
