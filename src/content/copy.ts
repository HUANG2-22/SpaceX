export type Locale = 'en' | 'zh'

export type SiteCopy = {
  nav: Record<string, string>
  hero: {
    eyebrow: string
    name: string
    affiliation: string
    editorial: string
    role: string
    slogan: string
    metrics: string
    scholarLabel: string
    emailLabel: string
  }
  research: {
    title: string
    subtitle: string
    cards: { title: string; body: string }[]
  }
  publications: {
    title: string
    subtitle: string
  }
  collaboration: {
    title: string
    introOneLine: string
    grantsTitle: string
    grants: string[]
    talksTitle: string
    talks: string[]
    partnersAlt: string
  }
  contact: {
    title: string
    bookMeetingLabel: string
    emailLabel: string
    scholarLabel: string
    locationLabel: string
    location: string
    locationAddress: string
  }
  footer: string
}

export const COPY: Record<Locale, SiteCopy> = {
  en: {
    nav: {
      home: 'Home',
      research: 'Research',
      publications: 'Publications',
      collaboration: 'Collaboration',
      contact: 'Contact',
    },
    hero: {
      eyebrow: 'AI For Science',
      name: 'LIANGLIANG XU',
      affiliation:
        'Postdoctoral Fellow, The University of Hong Kong · Supervisor: Prof. Zhengxiao Guo',
      editorial: 'Early Career Editorial Board — Rare Metals, Green Carbon',
      role: 'Computational Chemist · AI for Science',
      slogan: 'Bridging Chemistry and Intelligence',
      metrics: '3,170+ citations (Google Scholar)',
      scholarLabel: 'Google Scholar',
      emailLabel: 'Email',
    },
    research: {
      title: 'Research directions',
      subtitle:
        'Unified workflows across intelligent agents, simulation scale-up, and experiment-aware modeling for energy and catalysis.',
      cards: [
        {
          title: 'AI agents & LLMs',
          body: 'Agents and large language models for catalyst discovery, interpretable learning, and closed-loop materials design.',
        },
        {
          title: 'High-throughput computing',
          body: 'First-principles engines (VASP, cDFT, FHI-aims), microkinetics, AIMD, and scalable screening pipelines.',
        },
        {
          title: 'Laboratory intelligence',
          body: 'Linking models to electrochemistry and energy devices—descriptors, diagnostics, and testable hypotheses.',
        },
        {
          title: 'Computational catalysis',
          body: 'Single-atom and nanostructured catalysts, reaction mechanisms, and descriptor frameworks for OER, CO₂RR, and beyond.',
        },
        {
          title: 'Electrochemistry',
          body: 'Interfaces, electrolyzers, batteries, and zinc-metal systems from atomistic insight to device-relevant metrics.',
        },
        {
          title: 'Industry–academia programs',
          body: 'Joint roadmaps with funders and partners—from DOE/NRF-scale grants to translational milestones.',
        },
      ],
    },
    publications: {
      title: 'Publications',
      subtitle:
        '60+ SCI-indexed articles, including 40+ as first or corresponding author (incl. co-corresponding), in venues such as Nat. Commun., JACS, Angew. Chem., The Innovation, Adv. Mater., and Adv. Energy Mater.',
    },
    collaboration: {
      title: 'Collaboration',
      introOneLine:
        'Active international collaboration across AI for Science, computational catalysis, electrochemistry, high-throughput and autonomous discovery, and joint industry–academia programs.',
      grantsTitle: 'Grants & projects (selected)',
      grants: [
        'NRF Korea — Principal Investigator (RS-2023-00243788)',
        'U.S. DOE — CO₂ reduction electrocatalyst design (participant, DE-SC0023418)',
        'NRF Korea — Porous materials for energy storage & conversion (participant)',
        'Korea MOTIE — Energy harvesting materials for autonomous sensors (participant)',
      ],
      talksTitle: 'Selected talks',
      talks: [
        'IVEC 2019 & 2020 — oral presentations',
        'PCSI 2021 — oral presentation',
        'Invited talks — Zhejiang University & Ocean University of China (2022)',
        'ACS Senior Technical Meeting 2024 — oral',
        'ICAI 2025, 2nd ICGC, 5th ICECCE — oral presentations',
      ],
      partnersAlt: 'Partner institutions — add logos to /partners-logos.png',
    },
    contact: {
      title: 'Contact',
      bookMeetingLabel: 'Book personal meeting',
      emailLabel: 'Email',
      scholarLabel: 'Google Scholar',
      locationLabel: 'Affiliation',
      location: 'The University of Hong Kong',
      locationAddress: 'Pokfulam, Hong Kong SAR, China',
    },
    footer: '© 2026 Liangliang Xu · AI for Science · SPACE',
  },
  zh: {
    nav: {
      home: '首页',
      research: '研究方向',
      publications: '学术发表',
      collaboration: '合作交流',
      contact: '联系方式',
    },
    hero: {
      eyebrow: 'AI For Science',
      name: 'LIANGLIANG XU',
      affiliation: '香港大学 · 博士后\n合作导师：郭正晓院士',
      editorial: 'Rare Metals、Green Carbon 青年编委',
      role: 'Computational Chemist · AI for Science',
      slogan: 'Bridging Chemistry and Intelligence',
      metrics: '3,170+ citations (Google Scholar)',
      scholarLabel: 'Google Scholar',
      emailLabel: 'Email',
    },
    research: {
      title: '研究方向',
      subtitle:
        '在智能体、高通量计算与实验闭环之间，构建面向能源催化的一体化研究路径。',
      cards: [
        {
          title: 'AI 智能体与大模型',
          body: '面向催化剂发现、可解释学习与闭环材料设计的智能体与大语言模型方法。',
        },
        {
          title: '高通量计算',
          body: '第一性原理引擎（VASP、cDFT、FHI-aims）、微观动力学、AIMD 与可扩展筛选流程。',
        },
        {
          title: '实验室智能',
          body: '连接模型与电化学与能源器件——描述符、诊断量与可验证实验假设。',
        },
        {
          title: '计算催化',
          body: '单原子与纳米催化剂、反应机理，以及面向 OER、CO₂ 还原等的描述符体系。',
        },
        {
          title: '电化学',
          body: '表界面、电解槽、电池与锌金属体系，从原子尺度洞察到器件相关指标。',
        },
        {
          title: '产学研交叉课题',
          body: '与基金机构及产业伙伴的联合路线——从 DOE/NRF 级项目到转化里程碑。',
        },
      ],
    },
    publications: {
      title: '论文成果',
      subtitle:
        '累计发表 SCI 论文 60 余篇，其中第一作者 / 通讯（含共同）40 余篇；工作见于 Nat. Commun.、JACS、Angew. Chem.、The Innovation、Adv. Mater.、Adv. Energy Mater. 等国际顶刊。',
    },
    collaboration: {
      title: '合作交流',
      introOneLine:
        '在AI for Science、计算催化、电化学、高通量与自主发现流程、以及产学研联合课题积极开展国内外合作',
      grantsTitle: '项目与基金（节选）',
      grants: [
        '韩国国家研究基金会 NRF — 独立首席研究员（RS-2023-00243788）',
        '美国能源部 DOE — CO₂ 还原电催化剂理论设计（参与，DE-SC0023418）',
        'NRF — 多孔材料分层体系与下一代储能转化（参与）',
        '韩国产业通商资源部 — 智能传感器自供能材料与模块（参与）',
      ],
      talksTitle: '学术报告（节选）',
      talks: [
        'IVEC 2019、2020 — 口头报告',
        'PCSI 2021 — 口头报告',
        '特邀报告 — 浙江大学、中国海洋大学（2022）',
        'ACS Senior Technical Meeting 2024 — 口头',
        'ICAI 2025、第二届 ICGC、第五届 ICECCE — 口头报告',
      ],
      partnersAlt: '合作机构 Logo（请将图片置于 /partners-logos.png）',
    },
    contact: {
      title: '联系方式',
      bookMeetingLabel: '预约个人会议',
      emailLabel: '邮箱',
      scholarLabel: 'Google Scholar',
      locationLabel: '单位',
      location: '香港大学',
      locationAddress: '中国香港特别行政区薄扶林',
    },
    footer: '© 2026 徐亮亮 · AI for Science · SPACE',
  },
}

export const SCHOLAR_URL =
  'https://scholar.google.com/citations?hl=en&user=40Kw_QoAAAAJ&view_op=list_works&sortby=pubdate'

export const EMAIL = 'xuliang0826999@gmail.com'
