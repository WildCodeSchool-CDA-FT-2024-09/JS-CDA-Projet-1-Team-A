interface ModaleResultDetailProps {
  result: string;
}

const ModaleResultDetail: React.FC<ModaleResultDetailProps> = ({ result }) => (
  <div className="fixed inset-0 top-[170px] z-10 flex w-full flex-col items-center">
    <section className="relative flex h-[62vh] max-h-[62vh] w-[65vw] min-w-[280px] max-w-[700px] flex-col items-center justify-between rounded-xl bg-blue-fd bg-opacity-85 py-10">
      <p>Résultat : {result}</p>
    </section>
  </div>
);

export default ModaleResultDetail;
