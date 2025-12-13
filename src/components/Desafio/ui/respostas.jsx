


function Respostas( { options, handleAnswerClick, getAnswerClass } ) {
  return (
        <div className="grid gap-4 w-full">
            {options.map((option, index) => (
                <button className={`${getAnswerClass(index)} p-5 rounded-xl text-left font-semibold text-lg cursor-pointer disabled:cursor-not-allowed `}
                key={index}
                onClick={() => handleAnswerClick(index)}
                >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-foreground">{option}</span>
                </div>
                </button>
            ))}
        </div>
    )
}

export default Respostas;