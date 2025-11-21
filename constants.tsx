import React from 'react';
import { ThrottlingMethod, SectionId } from './types';
import { BookOpen, Settings, Activity, Aperture, BarChart3, Cpu } from 'lucide-react';

export const THROTTLING_METHODS: ThrottlingMethod[] = [
  {
    id: 'capillary',
    name: '毛细管节流 (Capillary)',
    description: '利用细长管的沿程阻力产生压力降。',
    mechanism: '层流流动 (Laminar Flow)，阻力与长度成正比。',
    stiffness: '中等',
    pros: ['结构简单', '流量与压差呈线性关系', '不易堵塞(相对小孔)', '制造相对容易'],
    cons: ['受温度(油液粘度)影响极大', '刚度不如反馈式节流'],
    applications: ['精密磨床', '一般载荷的静压导轨']
  },
  {
    id: 'orifice',
    name: '小孔节流 (Orifice)',
    description: '利用油液通过薄壁小孔时的局部阻力产生压力降。',
    mechanism: '紊流流动 (Turbulent Flow)，流量与压差平方根成比例。',
    stiffness: '较高 (比毛细管略高)',
    pros: ['受温度影响小 (粘度影响小)', '结构紧凑'],
    cons: ['极易堵塞', '小孔加工精度要求极高 (电火花/激光)', '容易产生啸叫/噪声'],
    applications: ['空间受限的场合', '温度变化较大的环境']
  },
  {
    id: 'diaphragm',
    name: '薄膜反馈节流 (Diaphragm)',
    description: '利用受压变形的薄膜改变节流间隙，实现负反馈调节。',
    mechanism: '变阻尼反馈控制。载荷增加 -> 腔压升高 -> 薄膜变形 -> 节流阻力减小 -> 补偿流量。',
    stiffness: '极高 (理论上可达无穷大)',
    pros: ['刚度极高', '承载能力强', '能自动调节'],
    cons: ['结构复杂', '薄膜易疲劳断裂', '动态响应需精心设计以防振荡'],
    applications: ['重型机床', '超精密加工中心 (对刚度要求极高)']
  },
  {
    id: 'spool',
    name: '滑阀反馈节流 (Spool Valve)',
    description: '利用阀芯的移动改变节流口开度，属于一种液压伺服系统。',
    mechanism: '有源反馈。检测腔压变化，推动阀芯移动，大幅度调节流量。',
    stiffness: '非常高',
    pros: ['承载能力大', '可调节范围广'],
    cons: ['结构最复杂', '成本高', '需要精密的配合间隙', '容易卡死'],
    applications: ['大型重载回转台', '巨型望远镜支承']
  }
];

export const NAV_ITEMS = [
  { id: SectionId.INTRO, label: '基本概念', icon: <BookOpen size={18} /> },
  { id: SectionId.PRINCIPLE, label: '工作原理', icon: <Cpu size={18} /> },
  { id: SectionId.THROTTLING, label: '节流方式详解', icon: <Aperture size={18} /> },
  { id: SectionId.DESIGN, label: '参数与精度', icon: <Settings size={18} /> },
  { id: SectionId.APPLICATIONS, label: '应用场景', icon: <Activity size={18} /> },
];
