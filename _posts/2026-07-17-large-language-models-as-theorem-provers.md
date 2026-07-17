---
layout: post
title: "Large language models as theorem provers"
description: "Using computability theory to identify an unavoidable limitation of LLMs as theorem provers."
---

Recently, general-purpose LLMs and systems built around them have achieved
spectacular successes in theorem proving and mathematical discovery. In May
2026, a general-purpose reasoning model developed by OpenAI autonomously
disproved the Erdős unit distance conjecture, which had been open since the
1940s. The argument was subsequently checked and analyzed by external
mathematicians [[1]](#ref-1), [[2]](#ref-2). In July 2026, OpenAI released a
manuscript claiming a complete proof of the Cycle Double Cover Conjecture, a
major open problem in graph theory dating from the 1970s. According to the
manuscript, the proof was produced entirely by GPT 5.6 Sol Ultra
[[3]](#ref-3). Only days later, Edgar Dobriban reported that GPT-5.6 Pro had
disproved a longstanding conjecture in statistics that had been widely
believed in for approximately twenty years [[4]](#ref-4). There are many other
such examples, but these are among the most striking recent examples.

Given these success stories, it is natural to ask whether LLMs will eventually
replace mathematicians as theorem provers. To answer this question, a good
starting point is the following question.

<div class="post-callout" markdown="1">
What are the limits of LLMs as theorem provers?
</div>

In this text, we use computability theory to identify a clear and unavoidable
limitation of LLMs as theorem provers.

To get started, we need to define formally what we mean by an LLM. In this
text we take a *very* abstract viewpoint on LLMs. Let $$\{0,1\}^*$$ denote the
set of all finite binary strings and $$[0,1]_\mathbb{Q}$$ the set of rational
numbers in the interval $$[0,1]$$. Recall that a *computable function* is
simply a function that can be computed by an algorithm. For us an LLM is any
computable function

$$
f:\{0,1\}^* \times \{0,1\}^* \to [0,1]_\mathbb{Q}
$$

such that for each $$x \in \{0,1\}^*$$ we have that

$$
\sum_{y \in \{0,1\}^*}f(x,y) = 1.
$$

Think of $$x$$ as the prompt and $$y$$ as the answer.[^binary] Thus an LLM is
simply an algorithm that gives for each prompt $$x$$ and possible answer $$y$$
a probability $$f(x,y)$$. Intuitively speaking, $$f(x,y)$$ is the probability
that the LLM gives answer $$y$$ on input $$x$$.

Two remarks are in order. First, typically LLMs do not generate the whole
answer at once but rather they generate the answer one token at a time.
However, this is only a cosmetic difference. To see this, let
$$\Pr(y|x,y_1,\dots,y_n)$$ denote the probability that the LLM outputs $$y$$ in
context $$x,y_1,\dots,y_n$$. If the answer $$y$$ consists of tokens
$$y_1,\dots,y_m$$, then the probability that the answer $$y$$ is given to
prompt $$x$$ can be calculated via

$$
\prod_{i=1}^m \mathrm{Pr}(y_i|x,y_1,\dots,y_{i-1}).
$$

That is, a token predictor can be turned into an answer predictor. On the
other hand, the generality of our definition also allows it to cover LLMs that
do not generate text one token at a time, such as diffusion-based LLMs
[[5]](#ref-5), [[6]](#ref-6).

Secondly, our model of an LLM is highly unrealistic in at least two respects.
First, we impose no bound on the time or space required to compute an answer
to a prompt. Second, we ignore the computational and statistical difficulty of
learning or constructing the LLM in the first place. The class permitted by
our definition is therefore much broader than the class of physically
realizable LLMs. This is a deliberate modeling choice, because if even these
vastly more powerful abstract LLMs are unable to perform certain tasks, then
no real-world LLM can perform them either.

Let's get back to our original question on what are the limits of LLMs as
theorem provers. Now that we know what an LLM is, we still need to decide what
it means that an LLM $$f$$ proves a theorem. Let $$\varphi$$ be a statement of
a mathematical theorem which we want $$f$$ to prove. For concreteness, we
assume that $$\varphi$$ is a sentence in the language of set theory. By a valid
proof of $$\varphi$$, we mean a valid formal ZFC-proof of $$\varphi$$ in some
fixed effective proof calculus. The exact choice of the background theory of
mathematics does not matter as long as we can effectively decide whether a
string is a valid proof.

Let $$\godel{\varphi}$$ be a binary encoding of the prompt "Give me a proof of
$$\varphi$$". We suggest the following informal definition.

<div class="post-callout" markdown="1">
We say that $$f$$ **proves** $$\varphi$$, if

$$
\Pr_f(\varphi) := \sum_{y \text{ is a valid proof of } \varphi} f(\godel{\varphi},y)
$$

is <strong style="color:var(--warm)">sufficiently high</strong>.
</div>

*Note that we do not allow $$f$$ to have an interaction with the human who is
making the request.* The reason for this is that we are interested in the
limits of LLMs and not in the limits of LLMs that can interact with humans.

Our definition of "$$f$$ proves $$\varphi$$" informally says that if we ask
$$f$$ to prove $$\varphi$$, it gives us a valid proof with sufficiently high
probability. But what do we mean by sufficiently high?

Let us first consider the following definition: <strong style="color:var(--warm)">sufficiently
high probability means non-zero probability</strong>. That is, an LLM "proves"
a theorem if it is possible for it to output a proof of the theorem.

In this case there is an LLM that can prove every theorem of ZFC. To see this,
consider the LLM

$$
f(x,y) := 2^{-2|y|-1}
$$

It is straightforward to check that for each $$x$$ the function
$$f(x,\cdot)$$ is indeed a probability distribution. Indeed,

$$
\sum_{y\in\{0,1\}^*}f(x,y)
=
\sum_{n=0}^{\infty}2^n2^{-2n-1}
=
\frac12\sum_{n=0}^{\infty}2^{-n}
=
1.
$$

Furthermore, if $$\varphi$$ is a theorem of ZFC and $$y$$ encodes a valid proof
of it, then $$f(\godel{\varphi},y) > 0$$, whence $$\Pr_f(\varphi) > 0$$. That
is, every theorem of ZFC can be proved by $$f$$.

Note that the answers of the above LLM are independent of the prompt, because
the prompt does not affect the probability distribution from which the answer
is sampled. To exclude such pathological LLMs, we consider the following
definition of "sufficiently high": <strong style="color:var(--warm)">sufficiently
high probability means probability bounded below by a fixed positive rational
number</strong>. More formally, there should exist a fixed rational number
$$c > 0$$ such that for every theorem $$\varphi$$ of ZFC we have that
$$\Pr_f(\varphi) \geq c$$.

With this definition, we can prove that there is no LLM that can prove every
theorem of ZFC. Suppose, towards a contradiction, that this is not the case.
Let $$f$$ be such an LLM and let $$c>0$$ be the promised rational lower bound.
By our assumption, for every statement $$\varphi$$ we have that either

$$
\Pr_f(\varphi)=0
\qquad\text{or}\qquad
\Pr_f(\varphi)\geq c.
$$

Moreover ZFC proves $$\varphi$$ iff $$\Pr_f(\varphi) \geq c$$. We now show that
this implies that we can decide whether a statement is a theorem of ZFC. Fix a
computable enumeration $$y_0,y_1,y_2,\ldots$$ of $$\{0,1\}^*$$ without
repetitions. Given a sentence $$\varphi$$, define

$$
a_n
:=
\sum_{\substack{i\leq n\\
y_i\text{ encodes a valid proof of }\varphi}}
f(\godel{\varphi},y_i)
$$

and

$$
b_n
:=
\sum_{\substack{i\leq n\\
y_i\text{ does not encode a valid proof of }\varphi}}
f(\godel{\varphi},y_i).
$$

Because $$f$$ is computable and it outputs rational numbers, both of these are
clearly computable. We now compute $$a_n$$ and $$b_n$$ for successively larger
$$n$$ until either

$$
a_n>\frac{c}{2}
\text{ or }
b_n>1-\frac{c}{2}.
$$

This procedure must eventually terminate. Indeed, if $$\varphi$$ is a theorem
of ZFC, then as $$n \to \infty$$ we have $$a_n\to \Pr_f(\varphi)\geq c,$$
whence eventually $$a_n>c/2$$. On the other hand, if $$\varphi$$ is not a
theorem of ZFC, then as $$n \to \infty$$ we have $$b_n \to 1,$$ whence
eventually $$b_n>1-c/2$$. Thus, if $$a_n > c/2$$, for some $$n$$, then
$$\varphi$$ is a theorem of ZFC. And if $$b_n > 1 - c/2$$, then it is not a
theorem of ZFC. Thus ZFC is decidable, which is a contradiction, if ZFC is
consistent. Hence we get the following.

<div class="post-callout" markdown="1">
If ZFC is consistent, then for every LLM and positive rational number $$c$$
there exist a theorem $$\varphi$$ of ZFC such that $$\Pr_f(\varphi) < c$$.
</div>

Thus, for example, there is no LLM that outputs for each theorem of ZFC a valid
proof with probability at least $$1/2026$$.

This result is open to the same criticism often directed at undecidability
results. It shows that no single LLM can reliably prove every theorem of ZFC,
but perhaps one LLM could nevertheless prove every theorem that human
mathematicians will ever care about. Our result, by itself, says nothing
either for or against this possibility. Even so, the result gives us genuine
conceptual understanding by identifying an inherent limitation of LLMs as
theorem provers.

[^binary]: In this text prompts and answers are indeed binary strings. This is not a real restriction, because sentences of natural language can be easily encoded in binary.

<div class="references" markdown="1">
## References

1. <a id="ref-1"></a>OpenAI, [*Planar Point Sets with Many Unit Distances*](https://cdn.openai.com/pdf/74c24085-19b0-4534-9c90-465b8e29ad73/unit-distance-proof.pdf), 2026.
2. <a id="ref-2"></a>Noga Alon, Thomas F. Bloom, W. T. Gowers, Daniel Litt, Will Sawin, Arul Shankar, Jacob Tsimerman, Victor Wang, and Melanie Matchett Wood, [*Remarks on the Disproof of the Unit Distance Conjecture*](https://cdn.openai.com/pdf/74c24085-19b0-4534-9c90-465b8e29ad73/unit-distance-remarks.pdf), 2026.
3. <a id="ref-3"></a>OpenAI, [*A Proof of the Cycle Double Cover Conjecture*](https://cdn.openai.com/pdf/04d1d1e4-bc75-476a-97cf-49055cd98d31/cdc_proof.pdf), 2026.
4. <a id="ref-4"></a>Edgar Dobriban, [*The Benjamini–Hochberg Procedure Can Fail to Control the FDR for Correlated Two-Sided Gaussian Tests*](https://faculty.wharton.upenn.edu/wp-content/uploads/2017/06/bh.pdf), 2026.
5. <a id="ref-5"></a>Xiang Li, John Thickstun, Ishaan Gulrajani, Percy Liang, and Tatsunori B. Hashimoto, *Diffusion-LM Improves Controllable Text Generation*, Advances in Neural Information Processing Systems, 2022.
6. <a id="ref-6"></a>Subham Sekhar Sahoo, Marianne Arriola, Yair Schiff, Aaron Gokaslan, Edgar Marroquin, Justin T. Chiu, Alexander Rush, and Volodymyr Kuleshov, *Simple and Effective Masked Diffusion Language Models*, Advances in Neural Information Processing Systems, 2024.
</div>
