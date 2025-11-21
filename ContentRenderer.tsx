import React from 'react';
import { SectionId } from '../types';
import { THROTTLING_METHODS } from '../constants';
import { CheckCircle2, XCircle, ArrowRight, Target, Activity, ShieldCheck, Ruler } from 'lucide-react';

interface Props {
  activeSection: SectionId;
}

const ContentRenderer: React.FC<Props> = ({ activeSection }) => {
  
  const renderIntro = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-3xl font-bold text-primary mb-4">什么是液体静压支承？</h2>
        <p className="text-lg text-slate-600 leading-relaxed mb-6">
          液体静压支承 (Hydrostatic Bearing) 是一种利用外部供油系统，将具有一定压力的润滑油通过节流器引入摩擦副之间，强制形成承载油膜，从而将运动表面完全隔开的支承方式。
        </p>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-sky-50 p-6 rounded-xl border border-sky-100">
            <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
              <ShieldCheck className="text-accent" size={20} />
              核心优势
            </h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2"></span>
                <span><b>纯液体摩擦：</b> 摩擦系数极低 (0.0005 ~ 0.005)，几近无磨损。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2"></span>
                <span><b>全速域承载：</b> 无论静止还是高速，都能保持高刚度油膜。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2"></span>
                <span><b>均化效应：</b> 油膜能平抑表面误差，提高运动精度。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2"></span>
                <span><b>吸振性好：</b> 油膜具有良好的阻尼特性。</span>
              </li>
            </ul>
          </div>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col justify-center items-center text-center">
            <div className="text-4xl font-black text-slate-200 mb-2">VS</div>
            <p className="text-sm font-medium text-slate-500">
              与动压支承 (Hydrodynamic) 不同，静压支承不依赖相对运动速度产生压力，因此在<span className="text-accent font-bold">低速</span>和<span className="text-accent font-bold">启动</span>阶段表现极佳。
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrinciple = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-primary mb-6">工作原理</h2>
        
        {/* Simplified Schematic Diagram using Flex/Borders */}
        <div className="relative h-48 bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 mb-8 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-10 text-8xl font-black text-slate-300 select-none">
            SYSTEM
          </div>
          <div className="flex items-center gap-4 z-10 w-full justify-center px-4">
            <div className="bg-white p-4 rounded shadow-md text-center w-24 border-l-4 border-accent">
              <div className="text-xs text-slate-500 font-bold">泵站</div>
              <div className="text-lg font-bold text-primary">Ps</div>
            </div>
            <ArrowRight className="text-slate-400 animate-pulse" />
            <div className="bg-orange-50 p-4 rounded shadow-md text-center w-32 border-2 border-orange-200">
              <div className="text-xs text-orange-500 font-bold">节流器</div>
              <div className="text-xs text-slate-600">产生压降</div>
            </div>
            <ArrowRight className="text-slate-400 animate-pulse" />
            <div className="bg-sky-100 p-4 rounded shadow-md text-center flex-1 max-w-xs border-2 border-sky-300">
              <div className="text-xs text-sky-600 font-bold">油腔 (Pocket)</div>
              <div className="text-lg font-bold text-primary">Pr</div>
              <div className="h-2 bg-sky-300/50 w-full my-2 rounded"></div>
              <div className="text-xs text-slate-500">封油面 (Land)</div>
            </div>
          </div>
        </div>

        <div className="prose prose-slate max-w-none">
          <h3 className="text-lg font-bold text-primary">核心机制</h3>
          <p>
            静压支承系统由供油系统、节流器和支承面组成。
            供油压力 <code className="bg-slate-100 px-1 py-0.5 rounded text-accent">Ps</code> 经过节流器后降为油腔压力 <code className="bg-slate-100 px-1 py-0.5 rounded text-accent">Pr</code>。
            当外载荷 <code className="bg-slate-100 px-1 py-0.5 rounded">W</code> 增加时，油膜厚度 <code className="bg-slate-100 px-1 py-0.5 rounded">h</code> 减小，导致回油阻力增大，油腔压力 <code className="bg-slate-100 px-1 py-0.5 rounded text-accent">Pr</code> 随之升高，从而平衡外载荷。
          </p>
          <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm my-4">
            W = Ae × Pr
            <br/>
            <span className="text-slate-400 text-xs">// Ae: 有效承载面积, Pr: 油腔压力</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderThrottling = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary">节流方式详解</h2>
        <p className="text-slate-500">节流器是静压支承的心脏，决定了支承的刚度和性能。</p>
      </div>
      
      <div className="grid gap-6">
        {THROTTLING_METHODS.map((method) => (
          <div key={method.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                {method.name}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                method.stiffness.includes('高') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                刚度: {method.stiffness}
              </span>
            </div>
            <div className="p-6">
              <p className="text-slate-600 mb-4 font-medium">{method.description}</p>
              <p className="text-sm text-slate-500 mb-6 bg-slate-50 p-3 rounded border border-slate-100">
                <span className="font-bold text-slate-700">机理：</span> {method.mechanism}
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1">
                    <CheckCircle2 size={16} className="text-green-500" /> 优点
                  </h4>
                  <ul className="space-y-2">
                    {method.pros.map((pro, idx) => (
                      <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                        <span className="w-1 h-1 bg-green-500 rounded-full mt-2 shrink-0"></span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1">
                    <XCircle size={16} className="text-red-500" /> 缺点
                  </h4>
                  <ul className="space-y-2">
                    {method.cons.map((con, idx) => (
                      <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                        <span className="w-1 h-1 bg-red-500 rounded-full mt-2 shrink-0"></span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase">典型应用:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {method.applications.map((app, idx) => (
                    <span key={idx} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDesign = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-primary mb-4">参数设计与精度</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold text-accent mb-3 flex items-center gap-2">
              <Ruler size={20} />
              关键设计参数
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="font-bold text-primary">油膜厚度 (h)</div>
                <div className="text-sm text-slate-600 mt-1">通常设计在 20-50μm。太薄则容易划伤，太厚则刚度下降。</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="font-bold text-primary">压力比 (β)</div>
                <div className="text-sm text-slate-600 mt-1">β = Pr / Ps。最佳刚度对应的压力比通常在 0.5 左右 (对于毛细管节流)。</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="font-bold text-primary">粘度 (μ)</div>
                <div className="text-sm text-slate-600 mt-1">直接影响温升和承载能力。高速宜选低粘度，重载选高粘度。</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-accent mb-3 flex items-center gap-2">
              <Target size={20} />
              精度均化效应
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              静压支承最神奇的特性在于其“误差均化”。由于油膜充满在导轨与滑块之间，它能整合大面积的微观几何误差。
            </p>
            <div className="bg-primary text-white p-6 rounded-xl text-center">
              <div className="text-sm text-slate-400 mb-2">精度改善公式 (近似)</div>
              <div className="text-xl font-mono">ε_motion ≈ ε_surface / √N</div>
              <div className="mt-4 text-xs text-slate-400 text-left">
                其中 N 为有效覆盖的波峰数量。这意味着支承的运动精度可以比加工精度高出一个数量级。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApplications = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-primary mb-6">应用场景一览</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: '超精密磨床', desc: '利用高刚度和高阻尼，实现镜面磨削。' },
            { title: '重型立车工作台', desc: '承载数百吨工件，实现近乎零摩擦启动。' },
            { title: '大型射电望远镜', desc: '如FAST天眼，支撑巨大的天线结构平稳转动。' },
            { title: '航空发动机测试台', desc: '模拟高速高载荷工况。' },
            { title: '光刻机工件台', desc: '纳米级的运动定位精度需求。' },
            { title: '精密回转台', desc: '用于高精度分度和测量。' },
          ].map((app, idx) => (
            <div key={idx} className="group p-6 bg-slate-50 hover:bg-accent hover:text-white rounded-xl transition-colors duration-300 cursor-default border border-slate-200 hover:border-accent">
              <Activity size={24} className="text-accent group-hover:text-white mb-3 transition-colors" />
              <h3 className="font-bold mb-2">{app.title}</h3>
              <p className="text-sm text-slate-500 group-hover:text-sky-100">{app.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  switch (activeSection) {
    case SectionId.INTRO: return renderIntro();
    case SectionId.PRINCIPLE: return renderPrinciple();
    case SectionId.THROTTLING: return renderThrottling();
    case SectionId.DESIGN: return renderDesign();
    case SectionId.APPLICATIONS: return renderApplications();
    default: return renderIntro();
  }
};

export default ContentRenderer;