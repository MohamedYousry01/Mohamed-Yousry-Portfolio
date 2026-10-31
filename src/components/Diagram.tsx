export const sceneNames = ['Embedded firmware', 'Ventilator control', 'Embedded cybersecurity', 'Secure boot', 'Software verification', 'Compliance process engineering'];

function Box({x,y,w=132,label,label2,sub,accent=false}:{x:number;y:number;w?:number;label:string;label2?:string;sub?:string;accent?:boolean}) {
  return <g><rect x={x} y={y} width={w} height="68" rx="9" fill={accent?'#edf4ff':'white'} stroke={accent?'#2563eb':'#cbd5e1'}/><text x={x+w/2} y={y+(label2?22:29)} textAnchor="middle" className="diagram-label">{label}{label2&&<tspan x={x+w/2} dy="16">{label2}</tspan>}</text>{sub&&<text x={x+w/2} y={y+(label2?55:48)} textAnchor="middle" className="diagram-small">{sub}</text>}</g>;
}
export default function Diagram({scene=0,id='diagram'}:{scene?:number;id?:string}) {
  const arrow=`${id}-arrow`;
  const link=(d:string,extra='')=><path d={d} fill="none" stroke="#89a3bf" strokeWidth="1.7" markerEnd={`url(#${arrow})`} className={`signal ${extra}`}/>;
  return <svg className="system-svg" viewBox="0 0 720 340" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
    <title id={`${id}-title`}>{`${sceneNames[scene]} conceptual architecture`}</title>
    <desc id={`${id}-desc`}>{[
      'A microcontroller CPU connected to Flash, RAM, CAN, SPI, UART, ADC, and PWM.',
      'Pressure setpoint flows through a controller, actuators including brushless DC motors, blowers, and valves, and the patient circuit, with pressure feedback closing the loop.',
      'Application firmware uses cryptographic services connected to HSM or SHE and protected keys. Software and hardware capabilities vary.',
      'Power on, bootloader, firmware authentication, validated application and execution. Invalid images follow a rejection path.',
      'Requirements lead to software design, implementation, unit testing and verification evidence. Traceability connects the stages.',
      'Applicable standards lead to process definition, documented procedures, controlled records, and review and improvement.'
    ][scene]}</desc>
    <defs><marker id={arrow} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 10 5 0 10" fill="#89a3bf"/></marker><pattern id={`${id}-grid`} width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="#dce5ef"/></pattern></defs>
    <rect width="720" height="340" fill={`url(#${id}-grid)`}/>
    {scene===0&&<>
      <rect x="254" y="81" width="212" height="185" rx="17" fill="white" stroke="#9ab5df"/>
      {[0,1,2,3,4,5,6].map(i=><g key={i} stroke="#9ab5df" strokeWidth="4"><path d={`M${275+i*28} 70v11M${275+i*28} 266v11`}/><path d={`M243 ${99+i*24}h11M466 ${99+i*24}h11`}/></g>)}
      <rect x="278" y="105" width="164" height="137" rx="9" fill="#edf4ff" stroke="#c5d8f9"/>
      <text x="360" y="151" textAnchor="middle" className="diagram-title">CPU</text><text x="360" y="177" textAnchor="middle" className="diagram-label">NXP Power Architecture /<tspan x="360" dy="19"> STM32</tspan></text><text x="360" y="224" textAnchor="middle" className="diagram-small">REAL-TIME FIRMWARE</text>
      {['Flash','RAM','CAN','SPI'].map((name,i)=><g key={name}>{link(`M${i<2?254:466} ${120+(i%2)*90}H${i<2?196:524}`)}<Box x={i<2?64:524} y={88+(i%2)*90} label={name}/></g>)}
      <text x="130" y="294" textAnchor="middle" className="diagram-label">UART</text><text x="360" y="317" textAnchor="middle" className="diagram-label">ADC → Embedded C → PWM</text><text x="590" y="294" textAnchor="middle" className="diagram-label">I/O interfaces</text>
      {link('M196 270H218V232H254')}{link('M466 232H502V270H524')}
    </>}
    {scene===1&&<>
      <text x="36" y="45" className="diagram-small">CLOSED-LOOP PRESSURE REGULATION</text>
      <Box x={26} y={101} w={140} label="Pressure setpoint" sub="Reference"/>
      <Box x={207} y={101} w={140} label="Controller" sub="PID / ADRC" accent/>
      <Box x={388} y={101} w={140} label="BLDC motor / blower" label2="/ Valves" sub="Control output"/>
      <Box x={569} y={101} w={125} label="Patient circuit" sub="Illustrative plant"/>
      {link('M166 135H204')}{link('M347 135H385')}{link('M528 135H566')}{link('M632 169V232H277V172')}
      <rect x="351" y="215" width="190" height="34" rx="17" fill="#edf8f6"/><text x="446" y="237" textAnchor="middle" className="diagram-label">Pressure feedback</text>
      <path d="M70 300h580" stroke="#cbd5e1"/><path d="M70 290H650" stroke="#89a3bf" strokeDasharray="5 5"/><path d="M70 300C115 300 124 261 150 275S180 295 220 288S310 290 650 290" stroke="#0d9488" strokeWidth="2.5" fill="none" className="wave"/>
    </>}
    {scene===2&&<>
      <text x="36" y="45" className="diagram-small">TRUST BOUNDARIES · SANITIZED ARCHITECTURE</text>
      <Box x={30} y={114} w={150} label="Application firmware" sub="Service requests"/>
      <Box x={216} y={114} w={160} label="Cryptographic services" sub="Controlled API" accent/>
      <Box x={415} y={114} w={120} label="HSM / SHE" sub="Hardware boundary"/>
      <Box x={574} y={114} w={120} label="Protected keys" sub="Restricted use"/>
      {link('M180 148H213')}{link('M376 148H412')}{link('M535 148H571')}
      <rect x="205" y="220" width="494" height="67" rx="10" fill="white" stroke="#cbd5e1" strokeDasharray="5 4"/><text x="452" y="246" textAnchor="middle" className="diagram-label">AES-128 · AES-CMAC · SHA-256</text><text x="452" y="269" textAnchor="middle" className="diagram-label">ECC P-256 · ECDH · ECDSA</text><text x="452" y="313" textAnchor="middle" className="diagram-small">Software / hardware support depends on platform capabilities</text>
    </>}
    {scene===3&&<>
      <Box x={25} y={80} w={105} label="Power on"/>
      <Box x={160} y={80} w={120} label="Bootloader"/>
      <Box x={310} y={80} w={150} label="Authentication" sub="Verify firmware" accent/>
      <Box x={490} y={80} w={205} label="Validated application" sub="Execution permitted"/>
      {link('M130 114H157')}{link('M280 114H307')}{link('M460 114H487')}
      <path d="M385 148V220H490" stroke="#b65c50" strokeWidth="1.7" fill="none" strokeDasharray="5 5"/>
      <rect x="490" y="193" width="205" height="60" rx="9" fill="#fff7f5" stroke="#dba49b"/><text x="592" y="219" textAnchor="middle" className="diagram-label">Invalid image rejected</text><text x="592" y="240" textAnchor="middle" className="diagram-small">No application handoff</text>
      <text x="371" y="308" textAnchor="middle" className="diagram-small">ILLUSTRATIVE SUCCESS AND FAILURE PATHS</text>
    </>}
    {scene===4&&<>
      {['Requirements','Software design','Implementation','Unit testing','Verification evidence'].map((name,i)=><g key={name}><Box x={18+i*141} y={106} w={125} label={name} sub={['Intent','Architecture','Embedded C','VectorCAST / Unity','Reviewable results'][i]} accent={i===3}/>{i<4&&link(`M${143+i*141} 140h13`)}</g>)}
      <path d="M80 178V229H643V178" stroke="#0d9488" strokeWidth="1.7" fill="none" strokeDasharray="5 5"/>
      <text x="360" y="259" textAnchor="middle" className="diagram-label">Requirements-to-tests traceability</text><text x="360" y="295" textAnchor="middle" className="diagram-small">MISRA C · IEC 62304 · Structural coverage review</text>
    </>}
    {scene===5&&<>
      {['Standards','Process definition','Procedures','Controlled records','Review & improve'].map((name,i)=><g key={name}><Box x={18+i*141} y={106} w={125} label={name} sub={['Requirements','Roles & activities','SOPs & reviews','Retained evidence','Change control'][i]} accent={i===2}/>{i<4&&link(`M${143+i*141} 140h13`)}</g>)}
      <path d="M643 178V229H80V178" stroke="#0d9488" strokeWidth="1.7" fill="none" strokeDasharray="5 5"/>
      <text x="360" y="259" textAnchor="middle" className="diagram-label">Maintain processes through review and approved change</text><text x="360" y="295" textAnchor="middle" className="diagram-small">IEC 62304 · IEC 81001-5-1 · ISO 13485</text>
    </>}
  </svg>;
}
