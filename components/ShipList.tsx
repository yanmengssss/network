
import React from 'react';
import { ShipData } from '../types';

interface Props {
  ships: ShipData[];
}

const ShipList: React.FC<Props> = ({ ships }) => {
  return (
    <div className="h-full overflow-y-auto pr-2">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="text-slate-500 border-b border-cyan-500/10 uppercase tracking-tighter">
            <th className="py-2 px-1">Vessel</th>
            <th className="py-2 px-1">Origin</th>
            <th className="py-2 px-1 text-center">ETA</th>
            <th className="py-2 px-1 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-cyan-500/5">
          {ships.map((ship) => (
            <tr key={ship.id} className="group hover:bg-cyan-500/5 transition-colors cursor-default">
              <td className="py-3 px-1">
                <div className="font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">{ship.name}</div>
                <div className="text-[10px] text-slate-500 uppercase">{ship.cargo}</div>
              </td>
              <td className="py-3 px-1 text-slate-400">{ship.origin}</td>
              <td className="py-3 px-1 text-center font-orbitron text-amber-500">{ship.eta}</td>
              <td className="py-3 px-1 text-right">
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                  ship.status === 'In Transit' ? 'bg-cyan-500/20 text-cyan-400' :
                  ship.status === 'Docking' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-slate-500/20 text-slate-400'
                }`}>
                  {ship.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipList;
